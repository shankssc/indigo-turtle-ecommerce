import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../global';
import './form.css';
import marketImage from './market.png';
import { SERVER_URL_FINAL, CORS_CONFIG } from '../../config';

export default function CreateProdPage(): JSX.Element {
  const navigate = useNavigate();
  const instance = axios.create({
    // baseURL: 'http://localhost:3001/api',
    baseURL: `${SERVER_URL_FINAL}`,
    withCredentials: true,
  });

  const onSubmit = async (values: Product): Promise<void> => {
    try {
      await instance.post('/products', {
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        image: values.image,
      });
    } catch (error) {
      console.error(error);
    }

    navigate('/');
  };

  return (
    <div className="container">
      <div className="left">
        <img src={marketImage} />
      </div>
      <div className="right">
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: 0,
            quantity: 0,
            image: '',
          }}
          onSubmit={async (values) => {
            await onSubmit(values);
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <div className="Prod">
              <div className="Container">
                <Form>
                  <label>name: </label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />

                  <label>description: </label>
                  <Field
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />

                  <label>price: </label>
                  <Field
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />

                  <label>stock: </label>
                  <Field
                    type="number"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                  />

                  <label>Image: </label>
                  <Field
                    type="text"
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                  />

                  <div className="submit">
                    <input type="submit" />
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
