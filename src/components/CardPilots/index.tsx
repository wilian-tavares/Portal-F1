import React from 'react';

import styles from './cardPilots.module.scss'



interface CardPilotsProps {
    Position: string;
    GivernName: string;
    DriverId: string;
    Points: number;
    Team: string;
    Wins: number;
}

export default function CardPilots({ Position, GivernName, DriverId, Points, Team, Wins }: CardPilotsProps) {
    return (

        
            <tr className='containerCardPilots'>
                <td>{Position}°</td>
                <td>{GivernName} {DriverId}</td>
                <td>{Team}</td>
                <td>{Points}</td>
                <td>{Wins}</td>
            </tr>
    )
}

<tr>
    <th>Posição</th>
    <th>Piloto</th>
    <th>Team</th>
    <th>Pontos</th>
    <th>Vitórias</th>
</tr> 