import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import CreateProdPage from './pages/CreateProdPage/CreateProdPage';
import { Provider } from 'react-redux';
import store from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="ProductPage/:id" element={<ProductPage />} />
          <Route path="AboutPage" element={<AboutPage />} />
          <Route path="CheckoutPage" element={<CheckoutPage />} />
          <Route path="AuthPage" element={<AuthPage />} />
          <Route path="createProduct" element={<CreateProdPage />} />
        </Routes>
      </div>
    </Provider>
  );
}
/* <Navbar /> */
export default App;
