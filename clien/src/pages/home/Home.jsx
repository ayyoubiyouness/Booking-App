import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Feautured from '../../components/feautured/Feautured'
import './home.css'
import PropertyList from '../../components/propertyList/PropertyList'
import FeauturedProperties from '../../components/FeauturedProperties/FeauturedProperties'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/footer/Footer'
//comment
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Feautured />
        <h1 className="homeTitle">Browse By properties</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeauturedProperties/>
        <MailList />
        <Footer />


      </div>

    </div>
  )
}

export default Home
