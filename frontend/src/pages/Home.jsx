import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest, fetchCategoriesRequest } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.product);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    name: '',
  });

  // Fetch categories & products on initial load
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
    dispatch(fetchProductsRequest(filters)); // Initial fetch with default filters
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    dispatch(fetchProductsRequest(filters)); // Dispatch fetch with current filters
  };

  return (
    <div className="max-w-7xl mx-auto p-2">
      <h1 className="text-2xl font-bold mb-2">All Products</h1>

      {/* Filters */}
      <div className="bg-white p-2 rounded shadow mb-2 grid grid-cols-1 md:grid-cols-5 gap-2">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded transition"
        >
          Filter
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;


// import React, { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';
// import api from '../services/api';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     category: '',
//     minPrice: '',
//     maxPrice: '',
//     name: '',
//   });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const params = {};
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value) params[key] = value;
//       });
//       const res = await api.get('/products', { params });
//       setProducts(res.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await api.get('/categories');
//       setCategories(res.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = () => {
//     fetchProducts();
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-2">
//       <h1 className="text-2xl font-bold mb-2">All Products</h1>

//       {/* Filters */}
//       <div className="bg-white p-2 rounded shadow mb-2 grid grid-cols-1 md:grid-cols-5 gap-2">
//         <select
//           name="category"
//           value={filters.category}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>{cat.name}</option>
//           ))}
//         </select>
//         <input
//           type="number"
//           name="minPrice"
//           placeholder="Min Price"
//           value={filters.minPrice}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="maxPrice"
//           placeholder="Max Price"
//           value={filters.maxPrice}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Search by name"
//           value={filters.name}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded transition"
//         >
//           Filter
//         </button>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
//         {products.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
