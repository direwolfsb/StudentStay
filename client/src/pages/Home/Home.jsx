import React from 'react';
import "./home.css";
import Navbar from '../../components/navbar/navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/featured';
import Footer from '../../components/footer/footer';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
            <Featured/>
            <Footer/>
        </div>
    </div>
  )
}

export default Home