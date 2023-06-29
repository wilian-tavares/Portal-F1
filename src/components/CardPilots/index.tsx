import React from 'react';



interface CardPilotsProps {
    Position: string;
    GivernName: string;
    DriverId: string;
    Points: number;
    Team: string;
    Wins: number;
}

export default function CardPilots({ Position, GivernName, DriverId, Points, Team, Wins}: CardPilotsProps){
    return(
        <tr className='containerCardPilots'>
              <td>{Position}°</td>
              <td>{GivernName} {DriverId}</td>
              <td>{Team}</td>
              <td>{Points}</td>
              <td>{Wins}</td>
        </tr>
    )
}