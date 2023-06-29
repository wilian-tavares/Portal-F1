
import { useState, useEffect } from "react";
import api from "../../Services/api";
import React from "react";


interface DriverStandingsProps {
position: string;
driver: string;
Driver: {
    givenName: string;
    driverId: string;
  };
points: number;
wins: number;
}




export default function Classificacao() {
const [driverStandings, setDriverStandings] = useState<DriverStandingsProps[]>([])

    async function getdriverStandings(){
      try {
        const response = await api.get('current/driverStandings.json')
        // const data = response.data.MRData.StandingsTable.StandingsLists;
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        setDriverStandings(data)
        console.log(data)
      


      } catch (error) {
        console.log(error)
      }

    }

    useEffect(() => {
        getdriverStandings()
        
        
        }, [])
  
    return(
        <div>
            <h1>Page Classificacao</h1>

            <div>
                    {
                        driverStandings.map((driver, index) => {
                            return(
                                <ul key={index}>
                                    <li>Position: {driver.position}°</li>
                                    <li>{driver.Driver?.givenName} {driver.Driver?.driverId}</li>
                                    <li>Points: {driver.points}</li>
                                    <li>Wins: {driver.wins}</li>
                                </ul>
                            )
                        })
                    }
                    
            </div>
        </div>
    )
}