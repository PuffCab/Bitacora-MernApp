import React from 'react'
import Feed from '../feed/Feed'
import Navbar from '../navbar/Navbar'
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
 