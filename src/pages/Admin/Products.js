import React, {useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'



const Products = () => {
    const [products,setProducts] = useState([])

    //get all products
    const getAllProducts = async () =>{
        try{
         const {data} = await axiosInstance({
            url:'/product/get-product',
          method:"GET",
        })
         setProducts(data.products)
        }catch(error){
            console.log(error)
            toast.error('Something went wrong')
        }
    };

    useEffect(() =>{
        getAllProducts();
    }, []);
    
  return (
    <Layout title={'Dashboard-All Products'}>
        <div className='row mt-2 mt-5 mx-auto'>
            <div className='col-md-3 mt-5'>
                <AdminMenu/>
            </div>
            <div className='col-md-9 mt-5'>
                <h1 className='text-center'>All Products List</h1>
                
                    <div className='d-flex flex-wrap products'>
                        
                        {products?.map((p) => (
                        <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}
                         className='product-link mb-2'>
                         <div className="card m-2 " style={{width: '18rem',height: '100%'}} >
                 <img src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top" alt={p.name} style={{height: '200px', objectFit: 'cover'}} />
                 <div className="card-body">
                 <h5 className="card-title">{p.name}</h5>
                 <p className="card-text">{p.description}</p>
                 </div>
                 </div>
             </Link>
             ))}
                        
             </div>
            </div>
        </div>
    </Layout>
  );
}

export default Products