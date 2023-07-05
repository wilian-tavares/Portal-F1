

import api from '../../Services/api';
import { useState, useEffect} from 'react';
import CardStandingsPilots from '../../components/CardStandingsPilots';
import styles from './season.module.scss';

export default function Seassons() {
  const [season, setSeason] = useState([]);
  const [year, setYear] = useState(2023);
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

  async function getTemporada(year) {
    try {
      const response = await api.get(`${year}/driverStandings.json`);
      const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      const dataSeasson = response.data.MRData.StandingsTable.season;

      setSeason(data);
      setYear(dataSeasson);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTemporada(year);
  }, []);

  function handleChange(e) {
    setNewYear(e.target.value);
    
  }

  async function newSearch() {
    await getTemporada(newYear);
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
                  GivernName={driver.Driver?.givenName}
                  DriverId={driver.Driver?.familyName}
                  Team={driver.Constructors[0].name}
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
