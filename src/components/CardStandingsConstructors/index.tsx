import React from "react";

interface CardConstructors {
    Position: number;
    Name: string;
    Points: number;
    Wins: number;
}

export default function CardStandingsConstructors({Position, Name, Points, Wins}: CardConstructors) {
    return(

    <tr>
        <td>{Position}</td>
        <td>{Name}</td>
        <td>{Points}</td>
        <td>{Wins}</td>
    </tr>
    )
}