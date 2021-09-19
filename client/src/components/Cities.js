import React from 'react';
import { useState, useEffect } from 'react';

const Cities = () => {

    const [cities, setCities] = useState()



    useEffect(() => {
        
        const getCities = async () => {
            const response = await fetch(
                "http://localhost:5000/api/trips/all"
            );
            const obj = await response.json()
            console.log(obj)
            setCities(obj)

        };

        getCities()
    }, []);





    return (
        <div>
            <h3>My cities</h3>
            {cities && cities.map((item, id) => (
                <ul>
                <li>{item.destiny}</li>
            </ul>
            ))}
            
            
        </div>
    );
};

export default Cities;