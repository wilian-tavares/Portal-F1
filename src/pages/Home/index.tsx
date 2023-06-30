import { useState, useEffect } from "react";
import api from '../../Services/api';
import CardPilots from "../../components/CardPilots";
import React from "react";

import styles from './home.module.scss';



export default function Home() {
const [driverStandings, setDriverStandings] = useState<DriverStandingsProps[]>([])
const [season, setSeason] = useState<number>(0);
const [round, setRound] = useState<number>(0);


interface DriverStandingsProps {
  position: string;
  Driver: {
    givenName: string;
    familyName: string
  }
  Constructors: {
    [0]: {
      name: string;
    }
  };
 
  points: number;
  wins: number;
}

async function getdriverStandings(){
try {
  const response = await api.get('current/driverStandings.json')
  // const data = response.data.MRData.StandingsTable.StandingsLists;
  const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  const dataSeasson = response.data.MRData.StandingsTable.season;
  const dataRound = response.data.MRData.StandingsTable.StandingsLists[0].round;


  setDriverStandings(data)
  setSeason(dataSeasson)
  setRound(dataRound)

  console.log(data)


} catch (error) {
  console.log(error)
}

}



useEffect(() => {
  getdriverStandings()
}, [])

  return (
    <div className="App">
      
     <h1>Portal-F1 Home</h1>

    
     <aside className={styles.aside}>
 
    <table>     
    <caption>Temporada {season} - Corrida {round}</caption>

      <tbody>
      <tr>
        <th>Posição</th>
        <th>Piloto</th>
        <th>Team</th>
        <th>Pontos</th>
        <th>Vitórias</th>       
      </tr>   

       
      {
        driverStandings.map((driver, index) => {
          return(
            <CardPilots key={index}
              Position={driver.position}

              GivenName={driver.Driver?.givenName} DriverId={driver.Driver?.familyName}
              Team={driver.Constructors[0].name}
              Points={driver.points}
              Wins={driver.wins}

           
              />
              )
            })
        }
        </tbody>
      </table>

    </aside>
     </div>
   
  );
}


