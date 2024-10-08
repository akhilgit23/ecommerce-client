import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useParams,useNavigate } from 'react-router-dom'
import api from '../api'



const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])

    useEffect(() => {
        if(params?.slug) getProductsByCategory()
    }, [params?.slug])

    const getProductsByCategory = async () =>{
        try{
          const { data } = await api.get(
            `/api/v1/product/product-category/${params.slug}`
          );
          setProducts(data?.products)
          setCategory(data?.category)
        }catch(error){
            console.log(error)
        }
}
  return (
    <Layout>
        <div className='container category mt-4 p-5'>
          <div className='heading mb-3'>
          <h4 className='text-center'> Category - {category?.name}</h4>
          <h6 className='text-center'>{products?.length} result found</h6>
          </div>
            
            <div className='row'>
            <div className='col-md-10 offset-1'>
            <div className='d-flex flex-wrap'>
    {products?.map((p) => (
        <div className="card m-2" style={{width: '18rem', height: '100%'}}>
            <img src={`https://ecommerce-server-coral-two.vercel.app/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{height: '200px', objectFit: 'cover'}}  />
            
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
                 <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                 <button className="btn btn-dark ms-1">Add To Cart</button>
                </div>
            </div>
        </div>
    ))}
</div>
           {/* <div className='m-2 p-3'>
              {products && products.length <total && (
                <button className='btn btn-warning' onClick={(e) =>{
                  e.preventDefault()
                  setPage(page+1)
                }}>
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div>*/}
          </div>
            </div>
        </div>

    </Layout>
  )
}

export default CategoryProduct