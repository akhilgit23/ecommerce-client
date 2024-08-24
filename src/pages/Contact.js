import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
        <div className='row contactus mt-5 p-5'>
          <div className='col-md-6 ms-5'>
            <img 
             src='/images/contact.jpg'
             alt='contactus'
             style={{width: "100%"}}
            />
          </div>
          <div className='col-md-4 mt-5 '>
            <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
            <p className='text-justify mt-2'>any query and info about product feel free to call anytime we 24X7 available</p>
            <p className='mt-3'><BiMailSend /> : www.help@horologe.com</p>
            <p className='mt-3'><BiPhoneCall /> : 012-2548465</p>
            <p className='mt-3'><BiSupport /> : 1800-0000-0000 (toll free)</p>
          </div>
        </div>
        </Layout>
  )
}

export default Contact