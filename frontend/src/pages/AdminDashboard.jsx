import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api, { setAuthToken } from '../services/api';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (user?.token) setAuthToken(user.token);
    fetchProducts();
    fetchCategories();
  }, [user]);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get('/categories');
    setCategories(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in editingProduct) {
      if (key !== 'image') data.append(key, editingProduct[key]);
    }
    if (editingProduct.newImages) {
      for (let i = 0; i < editingProduct.newImages.length; i++) {
        data.append('image', editingProduct.newImages[i]);
      }
    }

    if (editingProduct.id) {
      await api.put(`/products/${editingProduct.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      await api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    setEditingProduct(null);
    fetchProducts();
  };

  const handleInputChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditingProduct({ ...editingProduct, newImages: e.target.files });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded bg-white">
        <h2>{editingProduct?.id ? 'Edit' : 'Add'} Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editingProduct?.name || ''}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={editingProduct?.price || ''}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="discountedPrice"
          placeholder="Discounted Price"
          value={editingProduct?.discountedPrice || ''}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={editingProduct?.stock || ''}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={editingProduct?.description || ''}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
        <select
          name="categoryId"
          value={editingProduct?.categoryId || ''}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingProduct?.id ? 'Update' : 'Add'} Product
        </button>
      </form>

      {/* Product List */}
      <h2 className="mt-6 text-xl font-semibold">Products</h2>
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-2 mb-2 rounded flex justify-between items-center bg-white shadow"
        >
          <div>
            <p>{product.name}</p>
            <p>${product.discountedPrice}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(product)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
