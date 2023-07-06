import React from 'react';

import styles from './cardPilots.module.scss'



interface CardPilotsProps {
    Position: number;
    GivenName: string;
    DriverId: string;
    Points: number;
    Team: string;
    Wins: number;
}

export default function CardStandingsPilots({ Position, GivenName, DriverId, Points, Team, Wins }: CardPilotsProps) {
    return (

        
            <tr className={styles.containerCardPilots}>
                <td>{Position}°</td>
                <td>{GivenName} {DriverId}</td>
                <td>{Team}</td>
                <td>{Points}</td>
                <td>{Wins}</td>
            </tr>
    )
}

