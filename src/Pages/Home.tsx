import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProducts } from '../Slices/productSlice';
import NavBar from "../Components/NavBar";

interface Product {
  _id: string;
  name: string;
  description: string;
  qty: number;
  price: number;
  __v: number;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const handleAddToCart = (product: Product) => {
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="container vh-100">
      <NavBar />
      <h3 className="mb-3">Product List</h3>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="col-3">
                  Product Name
                </th>
                <th scope="col" className="col-3">
                  Description
                </th>
                <th scope="col" className="col-1">
                  Avl Qty
                </th>
                <th scope="col" className="col-2">
                  Price
                </th>
                <th scope="col" className="col-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.qty}</td>
                    <td>LKR {product.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.qty <= 0}
                      >
                        <i className="bi bi-cart-plus me-1"></i>
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No products available at this time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
