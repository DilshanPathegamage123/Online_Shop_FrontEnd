import React, { useState, useEffect } from "react";
import api from "../api";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  qty: number;
  price: number;
  __v?: number;
}

interface ProductAddFormProps {
  show: boolean;
  handleClose: () => void;
  productToEdit?: Product | null; 
}

const ProductAddForm = ({
  show,
  handleClose,
  productToEdit,
}: ProductAddFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [qtyError, setQtyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Update form when productToEdit changes
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setQty(productToEdit.qty);
      setPrice(productToEdit.price);
      setIsEditMode(true);
    } else {
      resetForm();
      setIsEditMode(false);
    }
  }, [productToEdit]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setQty(0);
    setPrice(0);
    setError("");
    setQtyError(false);
  };

  // Handlers remain the same
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(parseInt(e.target.value) || 0);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value) || 0);
  };

  const handleQtyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ".") {
      e.preventDefault();
      setQtyError(true);
    } else {
      setQtyError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation remains the same
    if (!name.trim()) {
      setError("Product name is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    if (qty <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name,
        description,
        qty,
        price,
      };

      if (isEditMode && productToEdit) {
        // Update existing product
        await api.put(`/products/${productToEdit._id}`, productData);
      } else {
        // Create new product
        await api.post("/products", productData);
      }
      resetForm();
      handleClose();
    } catch (err: unknown) {
      console.error(`Failed to ${isEditMode ? "update" : "add"} product:`, err);
      const apiError = err as ApiError;
      if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else {
        setError(
          `Failed to ${
            isEditMode ? "update" : "add"
          } product. Please try again.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal ${show ? "d-block" : "d-none"}`}
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                resetForm();
                handleClose();
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  maxLength={100}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows={3}
                  value={description}
                  onChange={handleDescriptionChange}
                  disabled={loading}
                  maxLength={400}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="qty" className="form-label">
                  Available Quantity
                </label>
                <input
                  type="number"
                  className={`form-control ${qtyError ? "is-invalid" : ""}`}
                  id="qty"
                  value={qty || ""}
                  onChange={handleQtyChange}
                  onKeyDown={handleQtyInput}
                  min="1"
                  step="1"
                  disabled={loading}
                  title="Please enter whole numbers only (no decimals)"
                  required
                />
                {qtyError && (
                  <div className="invalid-feedback">
                    Decimal values are not allowed for quantity
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text">LKR</span>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price || ""}
                    onChange={handlePriceChange}
                    min="0.01"
                    step="0.01"
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                resetForm();
                handleClose();
              }}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {isEditMode ? "Updating..." : "Saving..."}
                </>
              ) : isEditMode ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddForm;
