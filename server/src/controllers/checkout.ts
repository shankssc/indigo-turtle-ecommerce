import { Request, Response } from 'express';
import Stripe from 'stripe';

import prisma from '@/prisma';
import config from '@/config/envConfig';
import { checkoutSchema } from '@/validation/checkoutSchema';

/*
1. Authenticate request based on passport strategy. Check
2. Request Stripe API to deduct total cost of order from credit card / debit card
3. Deduct product quantity from db.
4. Create recipe/confirmation of purchase by creating a new row in Order and Order_Items table.
*/

interface Product {
  name: string;
  quantity: number;
  userId: number | null;
}

const createStripeSession = async (
  prods: Product[]
): Promise<Stripe.Response<Stripe.Checkout.Session> | string> => {
  try {
    if (config.STRIPE_TEST_KEY === undefined) {
      console.error('Error: Stripe Key not defined.');
      return 'Error: Stripe Key not defined.';
    }

    const stripe = new Stripe(config.STRIPE_TEST_KEY, {
      apiVersion: '2022-11-15',
    });

    const storeProducts = await prisma.product.findMany();

    const stripeItems = prods.map((prod) => {
      const p = storeProducts.find((sProd) => sProd.name === prod.name);

      if (p === undefined)
        throw new Error('No product found in Products table');
      if (+prod.quantity > p.quantity)
        throw new Error(
          'Requested product quantity is larger than the amount available.'
        );
      if (config.CLIENT_URL === undefined)
        throw new Error('Client url not found.');

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: p.name,
          },
          unit_amount: p.price.toNumber() * 100,
        },
        quantity: +prod.quantity,
      };
    });

    return await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: stripeItems,
      success_url: `${config.CLIENT_URL}/`,
      cancel_url: `${config.CLIENT_URL}/`,
      metadata: {
        userId: prods[0].userId,
      },
    });
  } catch (error) {
    console.error(error);
    return `Stripe API error -> ${error}`;
  }
};

/*
Req body


*/

export const checkout = async (req: Request, res: Response) => {
  const body = checkoutSchema.safeParse(req.body);
  if (body.success === false)
    return res.status(400).json({ errors: body.error.issues });

  const products = body.data.products;
  if (products.length === 0)
    return res.status(409).json({ errors: 'No product in cart' });

  const session = await createStripeSession(products);
  if (typeof session === 'string')
    return res.status(500).json({ errors: session });

  return res.status(200).json({ url: session.url });
};
