/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '@prisma/client';
import { type } from 'os';
import type { ReactNode } from 'react';
import { To } from 'react-router-dom';

interface User {
  id?: string;
  username: string;
  email?: string;
  password: string;
  address?: string;
}

interface Product {
  id?: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  image: string | null;
}

interface CartProduct {
  name: string;
  userId: number;
  quantity: number;
}

interface NavItemsProps {
  name?: string | string[];
  icon?: ReactNode | ReactNode[];
  image?: JSX.Element;
  path: string;
}

interface NavProps {
  icon: IconType;
  name: 'Sell Product' | 'About Us' | 'Cart';
  path: string;
}

interface NavItems {
  items: NavProps[];
}

interface Contact {
  img: string;
  title: string;
  price: number;
}

interface CartProduct {
  name: string;
  userId: number;
  quantity: number;
}

interface UserSession {
  id: string;
  username: string;
  email: string;
}
