import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetailRequest } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetail: product, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetailRequest(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
    navigate('/checkout');
  };

  if (loading || !product) return <div>Loading product...</div>;

  return (
    <ProductDetail
      product={product}
      quantity={quantity}
      setQuantity={setQuantity}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
    />
  );
};

export default ProductDetailPage;


// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ProductDetail from '../components/ProductDetail';
// import { AuthContext } from '../context/AuthContext';
// import { CartContext } from '../context/CartContext';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1); // ✅ Added quantity state
//   const { user } = useContext(AuthContext);
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     addToCart({ ...product, quantity }); // ✅ Use quantity state
//     alert('Product added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     addToCart({ ...product, quantity }); // ✅ Use quantity state
//     navigate('/checkout');
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <ProductDetail
//       product={product}
//       quantity={quantity} // ✅ Pass quantity
//       setQuantity={setQuantity} // ✅ Allow ProductDetail to manage quantity
//       onAddToCart={handleAddToCart}
//       onBuyNow={handleBuyNow}
//     />
//   );
// };

// export default ProductDetailPage;
