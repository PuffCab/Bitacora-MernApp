import React from 'react'

import Navbar from "../../components/navbar/Navbar"
import Feed from '../../components/feed/Feed';
import './home.css'
// import Cities from '../Cities'

function Home() {


 

    return (
        <div>
            <Navbar/>
            <h1>THIS IS MY HOME</h1>
            {/* <Cities/> */}
            <div className="homeContainer">
            <Feed/>   
            </div>
        </div>
    );
}

export default Home
  