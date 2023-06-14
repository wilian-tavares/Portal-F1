import { useState, useEffect } from "react";
import api from '../../Services/api';


function Home() {
const [allPilots, setAllPilots] = useState([])


async function getPilots() {
  try {
    const response = await api.get('2023/drivers.json')
    const data = response.data.MRData.DriverTable.Drivers;
    
    setAllPilots(data)
    console.log(allPilots)
    
  } catch (error) {
    console.log(error)
  }

}


useEffect(() => {
getPilots()


}, [])


  return (
    <div className="App">
      
     <h1>Portal-F1</h1>
     
     {
       allPilots.map((driver) => {
         return(
          <ul key={driver.driverId}>
            <li>Name: {driver.givenName} {driver.driverId}</li>
            <li>N°: {driver.permanentNumber}</li>
            <li>Country: {driver.nationality}</li>
            <li>aniversary: {driver.dateOfBirth}</li>
          </ul>
        
        )
      })
    }
   


    </div>
  );
}

export default Home;
