import React, { useState } from 'react';
import './form.css';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { selectUser,auth} from '../../store';
import type { UserSession } from '../../global';
import { SERVER_URL_FINAL, CORS_CONFIG } from '../../config';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function Auth(): JSX.Element {
  const userInfo = useSelector(selectUser);

  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  // interface SignUpValues {
  //   username: string;
  //   email: string;
  //   password: string;
  //   passwordConfirm: string;
  //   address: string;
  // }

  // interface SignInValues {
  //   username: string;
  //   password: string;
  // }

  const navigate = useNavigate();
  const instance = axios.create({
    // baseURL: 'http://localhost:3001/api',
    baseURL: `${SERVER_URL_FINAL}`,
    withCredentials: true,
  });

  interface AuthFormValues {
    username: string;
    email?: string;
    password: string;
    passwordConfirm?: string;
    address?: string;
  }

  const schema = isSignIn
    ? z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z
          .string()
          .min(8, 'Password must be at least 8 characters long'),
      })
    : z
        .object({
          username: z
            .string()
            .min(3, 'Username must be at least 3 characters long'),
          email: z.string().email('Please enter a valid email address'),
          address: z.string(),
          password: z
            .string()
            .min(8, 'Password must be at least 8 characters long'),
          passwordConfirm: z.string().min(8),
        })
        .refine((val) => val.password === val.passwordConfirm, {
          message: "Passwords don't match",
          path: ['passwordConfirm'],
        });

  const onSubmit = async (values: AuthFormValues): Promise<void> => {
    try {
      const response = isSignIn
        ? await instance.post(
            '/login',
            {
              email: values.email,
              password: values.password,
            },
            CORS_CONFIG
          )
        : await instance.post(
            '/register',
            {
              username: values.username,
              email: values.email,
              password: values.password,
              passwordConfirm: values.passwordConfirm,
              address: values.address,
            },
            CORS_CONFIG
          );

      const payload: UserSession = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
      };
      dispatch(auth(payload));

      console.log('User registered successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSwitch = (): void => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        address: '',
      }}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
      validationSchema={toFormikValidationSchema(schema)}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <div className="Auth">
          <div className="Container bg-indigo-500">
            <h2>{isSignIn ? 'Sign In' : 'Sign up'}</h2>
            <div className="Toggle">
              <div
                className={isSignIn ? 'ToggleBtn Active' : 'ToggleBtn'}
                onClick={toggleSwitch}
              />
              <div
                className={!isSignIn ? 'ToggleBtn Active' : 'ToggleBtn'}
                onClick={toggleSwitch}
              />
            </div>
            <Form>
              {isSignIn ? null : (
                <>
                  <label>Username: </label>
                  <Field
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                </>
              )}

              <label>Email: </label>
              <Field
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <label>Password: </label>
              <Field
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              {isSignIn ? null : (
                <>
                  <label>Confirm Password: </label>
                  <Field
                    type="password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                  />
                </>
              )}

              {isSignIn ? null : (
                <>
                  <label>Address: </label>
                  <Field
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </>
              )}

              <div className="submit group">
                <input
                  type="submit"
                  className="group-hover:text-neutral-white group-hover:bg-background-color"
                />
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
