import api from '../../Services/api';
import { useState, useEffect, ChangeEvent } from 'react';
import CardPilots from '../../components/CardPilots';
import React from 'react';

interface SeasonProps {
    position: string;
    Driver: {
        givenName: string;
        familyName: string;
    }
    team: string;
    points: number;
    wins: number;
}

export default function Personalizada(): JSX.Element {

    const [season, setSeason] = useState<SeasonProps[]>([]); // temporada
    const [year, setYear] = useState<number>(2023);          // ano 
    const [newYear, setNewYear] = useState<number>(year);    // novo ano

    const [round, setRound] = useState<number>(1) // número da corrida
    const [newRound, setNewRound] = useState<number>(round) // novo número da corrida

    const [loading, setLoading] = useState<boolean>(true)    // loading


    const optionsYear = [];
    for (let i = 2023; i >= 1950; i--) {
        optionsYear.push(
            <option
                key={i}
                value={i}
            >
                Opção {i}
            </option>
        );
    }

    const optionsRound = [];
    for (let i = 1; i <= 24; i++) {
        optionsRound.push(
            <option
                key={i}
                value={i}
            >
                Opção {i}
            </option>
        )
    }

    async function getTemporada(year?: number, round?: number) {
        try {
            const response = await api.get(`${year}/${round}/driverStandings.json`);
            const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            const dataSeasson = response.data.MRData.StandingsTable.season;
            console.log(data.name)
            console.log(data)
            console.log(round)

            setYear(dataSeasson);
            setSeason(data);


            console.log(season)
            setLoading(false)
            console.log(loading)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTemporada(Number(year), Number(round));
    }, [year, round]);


    // troca o número da temporada
    function handleChangeYear(e: ChangeEvent<HTMLSelectElement>): void {
        setNewYear(Number(e.target.value));
        setYear(Number(newYear));
    }

    // troca o número da corrida
    function handleChangeRound(e: ChangeEvent<HTMLSelectElement>): void {
        setNewRound(Number(e.target.value));
        setRound(Number(newRound));
    }


    async function newSearch(): Promise<void> {
        await getTemporada(newYear, newRound);
    }




    return (
        <div>
            <h1>Page Temporadas</h1>
            <br />
            <p>Escolha a temporada</p>
            <form>
                <select onChange={handleChangeYear}>
                    {optionsYear}
                </select>

                <p>Escolha a corrida</p>

                <select onChange={handleChangeRound}>
                    {optionsRound}
                </select>
                <input type="button" value="Pesquisar" onClick={newSearch} />
            </form>

            <br />

            {loading ? (
                <h2>Carregando temporada</h2>
            ) : (

                <>
                    <strong>Temporada {year} - Corrida {round}</strong>
                    <table>
                        <tbody>
                            <tr>
                                <th>Posição</th>
                                <th>Pilot</th>
                                <th>Team</th>
                                <th>Pontos</th>
                                <th>Vitórias</th>
                            </tr>

                            {season.map((driver, index) => (
                                <CardPilots key={index}
                                    Position={driver.position}
                                    GivernName={driver.Driver?.givenName} DriverId={driver.Driver?.familyName}
                                    Team={driver.team}
                                    Points={driver.points}
                                    Wins={driver.wins}
                                />
                            ))}
                        </tbody>
                    </table></>
            )}
        </div>
    );
}