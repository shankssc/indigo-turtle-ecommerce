import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartProduct,UserSession } from './global';

interface ProductSliceState {
  Products: CartProduct[];
}

type RootState = ReturnType<typeof store.getState>;

/* State */

const initialState: UserSession = {
  id: '',
  username: '',
  email: '',
};

const productInititalState: ProductSliceState = {
  Products: [],
};

/* Slices */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<UserSession>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.username = '';
    },
  },
});

export const { auth, logout } = userSlice.actions;

const productSlice = createSlice({
  name: 'Cart',
  initialState: productInititalState,
  reducers: {
    add: (state, action: PayloadAction<CartProduct>) => {
      state.Products.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.Products.splice(action.payload, 1);
    },
    clear: (state) => {
      state.Products = [];
    },
  },
});

/* Exporting Actions */

export const { add, remove, clear } = productSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: productSlice.reducer,
  },
});

export const selectUser = (state: RootState): UserSession => state.user;

export const selectCart = (state: RootState): CartProduct[] => state.cart.Products;

export default store;
