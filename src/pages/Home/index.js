import { useState, useEffect } from "react";
import api from '../../Services/api';
import CardPilots from "../../components/CardPilots";


export default function Home() {
const [allPilots, setAllPilots] = useState([])
const [driverStandings, setDriverStandings] = useState([])
const [season, setSeason] = useState(0);
const [round, setRound] = useState(0);


async function getPilots() {
  try {
    const response = await api.get('2023/drivers.json')
    // const data = response.data.MRData.DriverTable.Drivers;
       const data = response.data.MRData.DriverTable.Drivers;

    
    setAllPilots(data)
    //console.log(allPilots)
    
    
    
  } catch (error) {
    console.log(error)
  }

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
getPilots()
getdriverStandings()


}, [])


  return (
    <div className="App">
      
     <h1>Portal-F1 Home</h1>

    
     <aside >
      <strong>Temporada {season} - Corrida: {round}</strong>
     

    <table>     
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

              GivernName={driver.Driver?.givenName} DriverId={driver.Driver?.familyName}
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


