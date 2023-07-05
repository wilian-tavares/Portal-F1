import React from "react";
import { Link } from "react-router-dom";

interface CardPilotProps {
    Name: string;
    Number: string;
    Code: string;
    Wiki: string;
    Nationality: string;
    DateOfBirth: string;
}

export default function CardPilots({Name, Number, Code, Wiki, Nationality, DateOfBirth}: CardPilotProps) {
    return(

        <tr>
            <td>{Name}</td>
            <td>{Number}</td>
            <td>{Code}</td>
            <td>{Nationality}</td>
            <td>{DateOfBirth}</td>
            <td>
                <a target="_blank" href={`https://pt.wikipedia.org/wiki/${Name}`}>{Name}</a>
            </td>

        </tr>
    )
}