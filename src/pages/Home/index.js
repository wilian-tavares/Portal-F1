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
    console.log(allPilots)
    
    
    
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
  console.log(dataRound)



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

     
     {
      //  allPilots.map((driver) => {
      //    return(
      //     <ul key={driver.driverId}>
      //       <li>Name: {driver.givenName} {driver.driverId}</li>
      //       <li>N°: {driver.permanentNumber}</li>
      //       <li>Country: {driver.nationality}</li>
      //       <li>aniversary: {driver.dateOfBirth}</li>
      //     </ul>
        
      //   )
      // })
    }
     <aside >
      <strong>Temporada {season} - Corrida: {round}</strong>
     

    <table>     
      <tr>
        <td>Posição</td>
        <td>Piloto</td>
        <td>Pontos</td>
        <td>Vitórias</td>       
      </tr>   

         {/* <td>{driver.position}</td>
              <td>{driver.Driver?.givenName} {driver.Driver?.driverId}</td>
              <td>{driver.points}</td> */}
      {
        driverStandings.map((driver, index) => {
          return(
            <CardPilots key={index}
              Position={driver.position}

              GivernName={driver.Driver?.givenName} DriverId={driver.Driver?.driverId}
                Points={driver.points}
                Wins={driver.wins}

           
              />
              )
            })
        }
      </table>

    </aside>
     </div>
    
   


   
  );
}


