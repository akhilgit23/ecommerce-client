import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import {Checkbox,Radio} from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import api from '../../api';
//import axios from 'axios';



const HomePage = () => {
  const navigate = useNavigate()
  const [cart,setCart] = useCart()
  
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)

  
  //get category
   const getAllCategory = async () =>{
    
    try{
      const { data } = await api.get("/api/v1/category/get-category");
      if(data?.success){
        setCategories(data?.category)
      }
    }catch(error){
      console.log(error)
      

    }
  }

  useEffect(() =>{
      getAllCategory();
      getTotal()
  },[])

  //get all products
  const getAllProducts = async () =>{
    try{
      setLoading(true)
      const { data } = await api.get(`/api/v1/product/product-list/${page}`);
     setLoading(false)
     setProducts(data.products)
     
    }catch(error){
      setLoading(false)
      console.log(error)
      toast.error('Somethig went wrong')
    }
  }

   //get total count
  const getTotal = async () =>{
    try{
      const { data } = await api.get("/api/v1/product/product-count");
       setTotal(data?.total)
    }catch(error){
      console.log(error)
    }
    
  }

  useEffect( () =>{
   if(page === 1) return
    loadmore();
  }, [page])

  //loadmore fun
  const loadmore = async () =>{
    
    try{
      setLoading(true)
      const { data } = await api.get(`/api/v1/product/product-list/${page}`);
     setLoading(false)
     setProducts([...products, ...data?.products])
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }



  //filter by category
  const handleFilter = (value, id) =>{
   
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  }

   useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  useEffect(() =>{
  if(checked.length || radio.length)  filterProduct();
  }, [checked,radio]);

  //get filtered products
  const filterProduct = async () =>{
    try{
      const { data } = await api.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <Layout title={"Best Offers-Shop Now"}>

      {/* Bootstrap Carousel Slider */}
      <div id="productCarousel" className="carousel slide mt-5 py-3" data-bs-ride="carousel" data-bs-interval={3000}>
  <div className="carousel-inner d-flex">
    <div className="carousel-item active">
      <img src="/images/visual.jpg" className="d-block" alt="First slide"
        style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
    </div>
    <div className="carousel-item">
      <img src="/images/sale.jpg" className="d-block" alt="Second slide"
        style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
    </div>
    <div className="carousel-item">
      <img src="/images/carlos-muza-hpj.jpg" className="d-block" alt="Second slide"
        style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
    </div>
    <div className="carousel-item">
      <img src="/images/scott-graham.jpg" className="d-block" alt="Third slide"
        style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>



       <div className='container-fluid row mt-1 mx-auto home-page'>
          <div className='col-md-2 mt-5 filters'>
            <h4 className='text-start'>Filter By Category</h4>
            <div className='d-flex flex-column'>
            {categories?.map((c) =>(
              <Checkbox key={c._id} 
              onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
            </div>
             
             {/*filter by price*/}

            <h4 className='text-start mt-4 '>Filter By Price</h4>
            <div className='d-flex flex-column'>
           <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
               ))}
           </Radio.Group>
            </div>

            <div className='d-flex flex-column'>
          <button className='btn btn-danger mt-2' onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
          </div>
          <div className='col-md-9 offset-1'>
            <h1 className='text-center'>ALL PRODUCTS</h1>
            <div className='d-flex flex-wrap'>
   {products?.map((p) => (
        <div className="card m-2" style={{width: '18rem', height: '100%'}}>
            <img src=
            {`/api/v1/product/product-photo/${p._id}`} 
            className="card-img-top "
             alt={p.name} style={{height: '200px', objectFit: 'cover'}}  />
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-start">{p.name}</h5>
                <p className="card-text text-start">{p.description.substring(0, 30)}...</p>
                <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                <div className="mt-auto">
                 <button className="btn btn-info ms-1" 
                 onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                 <button className="btn btn-dark ms-1"
                  onClick={() =>{
                    setCart([...cart,p]);
                    localStorage.setItem('cart', JSON.stringify([...cart,p]));
                    toast.success('Item Added To Cart')
                    }}>Add To Cart</button>
                </div>
            </div>
        </div>
    ))}
</div>
            <div className='m-2 p-3'>
              {products && products.length <total && (
                <button className='btn loadmore' onClick={(e) =>{
                  e.preventDefault()
                  setPage(page+1)
                }}>
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
        </Layout>
  )
}

export default HomePage;