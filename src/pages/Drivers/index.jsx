import {useState, UseEffect, useEffect } from 'react';
import api from '../../Services/api';

export default function Drivers() {

    const [allDrivers, setAllDrivers] = useState([]);
    const [year, setYear] = useState('current')
    const [newYear, setNewYear] = useState();

    const options = [];
  for (let i = 2023; i >= 1950; i--) {
    options.push(
      <option 
        key={i} 
        value={i} 
        name={i}
      >
        Opção {i}
      </option>
    );
  }


    async function getAllDrivers(year) {
        try {
            const response = await api.get(`${year}/drivers.json`)
            const data = response.data.MRData.DriverTable.Drivers;
            //console.log(data);
            setAllDrivers(data)

        } catch (error) {
            console.log(error);
        }
    }

    

  function handleChange(e) {
    setNewYear(e.target.value);
    setYear(newYear)
   
  }
  async function newSearch() {
    await getAllDrivers(newYear);
  }

useEffect(() => {
    getAllDrivers(year)
}, [])


    return(
        <div>
            <h1>Page Drivers</h1>
            <br />
            <p>Escolha a temporada</p> 
            <form>
                <select onChange={handleChange}>
                {options}
                </select>
                <input type='button' value='Pesquisar' onClick={newSearch}  />
            </form>


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