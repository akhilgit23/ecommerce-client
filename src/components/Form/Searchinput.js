import React, { useState } from 'react'
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom'
import api from '../../api';




const SearchInput = () => {
    const [values,setValues] = useSearch()

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
          const { data } = await api.get(
            `/api/v1/product/search/${values.keyword}`
          );
          setValues({...values,results: data})
          navigate("/search")
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        <form className="d-flex px-3 py-1" role="search" onSubmit={handleSubmit}>
  <input className="form-control me-2"
   type="search" 
   placeholder="Search"
    aria-label="Search"
    value = {values.keyword}
     onChange={(e) => setValues({...values,keyword:e.target.value})}
     />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput