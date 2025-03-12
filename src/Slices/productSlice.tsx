import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import api from "../api";

interface Product {
    _id: string;
    name: string;
    description: string;
    qty: number;
    price: number;
    __v: number;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
  }

  const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
  };

  const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
          },
          setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
    },
    setProducts: (state, action : PayloadAction<Product[]>) => {
        state.products = action.payload;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      }, 
      
      addProduct: (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      },
      updateProduct: (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      },
    },
     });

     export const { setLoading, setError, setProducts, removeProduct, addProduct, updateProduct } = productSlice.actions;

     export const fetchProducts = () => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
          const response = await api.get('/products');
          dispatch(setProducts(response.data));
        } catch (err: any) {
          dispatch(setError('Failed to load products. Please try again later.'));
        } finally {
          dispatch(setLoading(false));
        }
      };
      
      export const deleteProduct = (id: string) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
          await api.delete(`/products/${id}`);
          dispatch(removeProduct(id));
        } catch (err: any) {
          dispatch(setError('Failed to delete product. Please try again.'));
        } finally {
          dispatch(setLoading(false));
        }
      };

      export const createProduct = (productData: Omit<Product, '_id' | '__v'>) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
          const response = await api.post('/products', productData);
          dispatch(addProduct(response.data));
        } catch (err: any) {
          dispatch(setError('Failed to add product. Please try again.'));
        } finally {
          dispatch(setLoading(false));
        }
      };
      
      export const editProduct = (productData: Product) => async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
          const response = await api.put(`/products/${productData._id}`, productData);
          dispatch(updateProduct(response.data));
        } catch (err: any) {
          dispatch(setError('Failed to update product. Please try again.'));
        } finally {
          dispatch(setLoading(false));
        }
      };
      
      export default productSlice.reducer;