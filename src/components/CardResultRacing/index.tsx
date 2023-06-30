
import React from 'react';
//import styles from './cardResultRacing.scss';


interface CardResultRacingProps {
    Position: number;
    Number: number;
    GivenName: string; // Max
    FamilyName: string; //Verstappen
    Points: number
    Team: string;
    Grid: number;
    Lap: number;
    Time?: string;
    Status: string;

}

export default function CardResultRacing({ Position, Number, GivenName,FamilyName, Points, Team, Grid, Lap, Time, Status}: CardResultRacingProps) {
    return (

        // <tr className={styles.containerCardResultRacing}>
        <tr >
            <td>{Position}°</td>
            <td>{Number}</td>
            <td>{GivenName} {FamilyName}</td>

            <td>{Team}</td>
            <td>{Grid}</td>
            <td>{Time}</td>
            <td>{Lap}</td>

            <td>{Points}</td>
            <td>{Status}</td>
        </tr>

    )
}


