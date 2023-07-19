

import api from '../../Services/api';
import { useState, useEffect, ChangeEvent} from 'react';
import CardStandingsPilots from '../../components/CardStandingsPilots';
import styles from './season.module.scss';
import React from 'react';

interface SeasonProps {
  position: number;
  Driver: {
    givenName: string;
    familyName: string;
  }
  Constructors: {
    name: string;
  };
  points: number;
  wins: number;
}


export default function Seassons(): JSX.Element {
  const [season, setSeason] = useState<SeasonProps[]>([]);
  const [year, setYear] = useState<string>('2023');

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

  async function getTemporada(year: string) {
    try {
      const response = await api.get(`${year}/driverStandings.json?limit=1000`);
      const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      const dataSeasson = response.data.MRData.StandingsTable.season;

      setSeason(data);
      setYear(dataSeasson);
      //console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTemporada(year);
  }, []);

  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    setYear(e.target.value);
    
  }

  async function newSearch() {
    await getTemporada(year);
  }

  return (
    <div className={styles.seasonContainer}>
      <h1>Temporadas</h1>
      <br/>
      <p>Escolha a temporada</p> 
      <form>
        <select onChange={handleChange}>
          {options}
        </select>
        <input className={styles.inputBotton} type='button' value='Pesquisar' onClick={newSearch}  />
      </form>

      <br/>
      <table>
        <caption>Temporada de Pilotos {year}</caption>
        <tbody>
          <tr>
            <th>Posição</th>
            <th>Piloto</th>
            <th>Team</th>
            <th>Pontos</th>
            <th>Vitórias</th>
          </tr>
          {
            season.map((driver, index) => {
              return (
                <CardStandingsPilots key={index}
                  Position={driver.position}
                  GivenName={driver.Driver?.givenName}
                  DriverId={driver.Driver.familyName}
                  Team={driver.Constructors.name}
                  Points={driver.points}
                  Wins={driver.wins}
                />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
