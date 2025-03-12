import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductAddForm from "../Components/ProductAddForm";
import NavBar from "../Components/NavBar";
import { RootState, AppDispatch } from '../store';
import { fetchProducts, deleteProduct } from '../Slices/productSlice';

interface Product {
  _id: string;
  name: string;
  description: string;
  qty: number;
  price: number;
  __v: number;
}

const Admin_Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddForm, setShowAddForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenForm = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    dispatch(fetchProducts());
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container m-auto vh-100">
      <NavBar />
      <h3 className="mb-3">Available Products</h3>
      <button
        className="btn btn-warning mb-3 ms-auto d-block"
        onClick={handleOpenForm}
      >
        <i className="bi bi-plus-circle me-2"></i>Add New Product
      </button>

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
                <th scope="col" className="col-1">
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
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        title="Edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => handleDelete(product._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No products found. Add some products to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ProductAddForm show={showAddForm} handleClose={handleCloseForm} productToEdit={productToEdit} />
    </div>
  );
};

export default Admin_Page;