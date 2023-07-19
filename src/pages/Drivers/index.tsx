import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';
import api from '../../Services/api';
import React from 'react';
import CardPilots from '../../components/CardPilots';

import styles from './drivers.module.scss';



interface AllDriversProps {
  givenName: string;
  familyName: string;
  permanentNumber: string;
  code: string;
  nationality: string;
  dateOfBirth: string;
  url: string;
}


export default function Drivers(): JSX.Element {

  const [allDrivers, setAllDrivers] = useState<AllDriversProps[]>([]);
  const [year, setYear] = useState<string>('current')
  // const [newYear, setNewYear] = useState<number | string>();

  const options = [];
  for (let i = 2023; i >= 1950; i--) {
    options.push(
      <option
        key={i}
        value={String(i)}
      >
        Opção {i}
      </option>
    );
  }


  async function getAllDrivers(year?: string) {
    try {
      const response = await api.get(`${year}/drivers.json?limit=1000`)
      const data = response.data.MRData.DriverTable.Drivers;
      // console.log(data);
      setAllDrivers(data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllDrivers(year)
  }, [])


  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
   // setNewYear(e.target.value);
    setYear(e.target.value)

  }
  async function newSearch(year: string): Promise<void> {
    await getAllDrivers(year);
  }



  return (
    <div className={styles.driversContainer}>
      <h1> Pilotos</h1>
      <br />
      <p>Escolha a temporada</p>
      <form>
        <select onChange={handleChange}>
          {options}
        </select>
        <input className={styles.inputBotton} type="button" value="Pesquisar" onClick={() => newSearch(year)} />

      </form>

      <table className={styles.tableDrivers}>
        <caption>Pilotos da Temporada {year}</caption>

        <tbody>
          <tr>
            <th>Nome</th>
            <th>Número</th>
            <th>Código</th>
            <th>Nacionalidade</th>
            <th>Aniversário</th>
            <th>Wikipédia</th>
          </tr>

          {
            allDrivers.map((driver, index) => {
              return (
                <CardPilots key={index}
                  Name={`${driver.givenName} ${driver.familyName}`}
                  Number={driver.permanentNumber}
                  Code={driver.code}
                  Nationality={driver.nationality}
                  DateOfBirth={driver.dateOfBirth.split('-').reverse().join('/')}
                  Wiki={driver.url}


                />
              )
            })

          }
        </tbody>
      </table>

    </div>
  )
}