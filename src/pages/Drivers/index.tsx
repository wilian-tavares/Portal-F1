import {useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';
import api from '../../Services/api';
import React from 'react';



interface AllDriversProps {
  givenName: string;
  familyName: string;
  permanentNumber: string;
  code: string;
  nationality: string;
}


export default function Drivers(): JSX.Element {

    const [allDrivers, setAllDrivers] = useState<AllDriversProps[]>([]);
    const [year, setYear] = useState<number | string>('current')
    const [newYear, setNewYear] = useState<number | string>();

  const options = [];
  for (let i = 2023; i >= 1950; i--) {
    options.push(
      <option 
        key={i} 
        value={i} 
      >
        Opção {i}
      </option>
    );
  }


    async function getAllDrivers(newYear?: number) {
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
        getAllDrivers(Number(year))
    }, [])
    

  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    setNewYear(e.target.value);
    setYear(Number(newYear))
   
  }
  async function newSearch(newYear: number): Promise<void> {
    await getAllDrivers(newYear);
  }



    return(
        <div>
            <h1>Page Drivers</h1>
            <br />
            <p>Escolha a temporada</p> 
            <form>
                <select onChange={handleChange}>
                {options}
                </select>
                <input type="button" value="Pesquisar" onClick={() => newSearch(Number(newYear))} />

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