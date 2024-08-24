import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
        <div className='row mt-5 p-5'>
          <div className='col-md-6 ms-5 mt-5'>
          <img
            src='/images/privacy-policy.jpg'
            alt='privacy-policy'
            style={{width:"100%"}}
          />
          </div>
          <div className='col-md-4 mt-5'>
            <p>Welcome to [Your Website Name] ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website, [Your Website URL], or use our services.</p>
            <h3> How We Protect Your Information</h3>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal data is stored behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.</p>
            <p>add privacy policy</p>
            </div>
        </div>
    </Layout>
  )
}

export default Policy