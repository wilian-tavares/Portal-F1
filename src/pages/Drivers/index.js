import {useState, UseEffect, useEffect } from 'react';
import api from '../../Services/api';

export default function Drivers() {

    const [allDrivers, setAllDrivers] = useState([]);
    const [year, setYear] = useState('current')


    async function getAllDrivers() {
        try {
            const response = await api.get(`${year}/drivers.json`)
            const data = response.data.MRData.DriverTable.Drivers;
            console.log(data);
            setAllDrivers(data)

        } catch (error) {
            console.log(error);
        }
    }

useEffect(() => {
    getAllDrivers()
}, [])


    return(
        <div>
            <h1>Page Drivers</h1>

            {
                allDrivers.map((driver, index) => {
                    return(
                    <article key={index}>
                        <strong>{driver.givenName} {driver.familyName} </strong>
                        <strong>{driver.permanentNumber} </strong>
                        <strong>{driver.code} - </strong>
                        <strong>{driver.nationality} </strong>
                        <strong><a target='_blank' href={`https://pt.wikipedia.org/wiki/${driver.givenName} ${driver.familyName}`}>Wikpedia</a></strong>

                    </article>
                    )
                })
            }
        </div>
    )
}