import React, { useState } from 'react';
import './form.css';
import axios, { AxiosResponse } from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import store, { selectUser, auth, logout } from '../../store';
import type { UserState } from '../../store';
import { SERVER_URL } from '../../config';

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
    baseURL: `${SERVER_URL}`,
    withCredentials: true,
  });

  interface AuthFormValues {
    username: string;
    email?: string;
    password: string;
    passwordConfirm?: string;
    address?: string;
  }

  const onSubmit = async (values: AuthFormValues): Promise<void> => {
    try {
      const response = isSignIn
        ? await instance.post('/login', {
            email: values.username,
            password: values.password,
          })
        : await instance.post('/register', {
            username: values.username,
            email: values.email,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
            address: values.address,
          });

      const payload: UserState = {
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
              <label>Username: </label>
              <Field
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
              />

              {isSignIn ? null : (
                <>
                  <label>Email: </label>
                  <Field
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </>
              )}

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
