
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate();
    const [values,setValues] = useSearch()
  return (
    <Layout title={'Your Search results'}>
      <div className='container mt-5 search-product'>
        <div className='text-center p-4'>
        <h1>Search results</h1>
            <h6>{values?.results.length < 1 ? 'No Products Found'
             : `Found${values?.results.length}`}</h6>
             <div className='d-flex flex-wrap mt-4'>
            {values?.results.map((p) => (
                        
                         <div className="card m-2" style={{width: '18rem'}} >
                 <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                 <div className="card-body">
                 <h5 className="card-title text-start">{p.name}</h5>
                 <p className="card-text text-start">{p.description.substring(0,30)}...</p>
                 <h5 className='card-title text-start'>$ {p.price}.00</h5>
                 <button class="btn btn-info ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                 <button class="btn btn-dark ms-1">Add To Cart</button>
                 </div>
                 </div>
               ))}
            </div>
        </div>

      </div>
    </Layout>
  )
}

export default Search