import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { useParams,useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';
import axios from 'axios';


const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  
  }, [params?.slug]);

  
  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success('Item Added To Cart');
  };

  return (
    <Layout title={'Product Details'}>
      <div className='row container product-details mx-2 mt-5 py-5'>
        <div className='col-md-6 card'>
          <img 
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top" 
            alt={product.name}
            height='350'
            width={'350px'} 
          />
        </div>
        <div className='col-md-6 product-details-info'>
          <h1 className='text-center'>Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Category: {product.category?.name}</h6>
          <h6>
            Price: 
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <button className="btn btn-dark ms-1" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>

      <hr />

      <div className='row container similar-products'>
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
        <div className='d-flex flex-wrap'>
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{width: '18rem'}} key={p._id}>
              <img 
                src={`/api/v1/product/product-photo/${p._id}`} 
                className="card-img-top" 
                alt={p.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0,30)}...</p>
                <h5 className="card-title card-price">
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h5>
                <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button className="btn btn-dark ms-1" onClick={handleAddToCart}>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails;