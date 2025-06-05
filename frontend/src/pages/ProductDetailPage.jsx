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
