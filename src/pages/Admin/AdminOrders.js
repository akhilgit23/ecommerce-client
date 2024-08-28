import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { Select } from 'antd'
const {Option} = Select





const AdminOrders = () => {
    
 const [status,setStatus] = useState(["Not Process", "Processing", "Shipped", "delivered", "Cancel"])
 const [changeStatus,setChangeStatus] = useState("")
 const [orders,setOrders] = useState([])
  const [auth,setAuth] = useAuth()

  const getOrders = async () =>{
    try{
       const {data} = await axiosInstance({
        url:'/auth/all-orders',
        method:"GET",
      })
       setOrders(data)
    }catch(error){
      console.log(error)
    }
    
  }
  useEffect(() =>{
    if(auth?.token) getOrders()
  }, [auth?.token])

  //status update
  const handleChange = async (orderId,value) =>{
    try{
     const {data} = await axiosInstance({
      url:`/auth/order-status/${orderId}`,
    method:"PUT",
    data:{status:value},
    })
     getOrders();
    }catch(error){
        console.log(error)
    }
  }
  return (
    <Layout title={'All Orders'}>
       <div className='row mt-5 p-4'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Orders</h1>
            {
                  orders?.map((o, i) => {
                    return(
                      <div className='border shadow'>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope='col'>#</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Buyer</th>
                              <th scope='col'>Date</th>
                              <th scope='col'>Payment</th>
                              <th scope='col'>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{i+1}</td>
                              <td>
                                <Select bordered={false} onChange={(value) =>
                                    handleChange(o._id,value)} defaultValue={o?.status}>
                                 {status.map((s,i) => (
                                    <Option key={i} value={s}>{s}</Option>
                                 ))}

                                </Select>
                              </td>
                              <td>{o?.buyer?.name}</td>
                              <td>{moment(o?.createdAt).fromNow()}</td>
                              <td>{o?.payment.success ? "Success" : "failed"}</td>
                              <td>{o?.products?.length}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className='container order-img'>
                        {
                        o?.products?.map((p,i) => (
                            <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4 card  d-flex align-items-center justify-content-center'>
                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top" 
                                 alt={p.name} 
                                 width="100px"
                                 height={"100px"}
                                 />
                                </div>
                                <div className='col-md-8'>
                                    <h5>{p.name}</h5>
                                    <p>{p.description.substring(0,30)}...</p>
                                    <p> Price : $ {p.price}</p>
                                    
                                </div>
                            </div>
                        ))
                    }
                        </div>
                      </div>
                    )
                  })
                }
        </div>
       </div>
    </Layout>
  )
}

export default AdminOrders