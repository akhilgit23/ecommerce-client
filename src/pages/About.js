import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>
        <div className='row aboutus mt-5 p-5 mx-auto '>
          <div className='col-md-6 ms-5 me-5'>
            <img
            src='/images/aboutus.jpg'
            alt='aboutus'
            style={{width: "100%"}}
            />
          </div>
          <div className='col-md-4 mt-5'>
               <p className='text-justify mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
               </div>
        </div>
    </Layout>
  )
}

export default About;