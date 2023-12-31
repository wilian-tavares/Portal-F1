import api from '../../Services/api';
import { useState, useEffect, ChangeEvent } from 'react';
import React from 'react';

import styles from './personalizada.module.scss'

import CardStandingsPilots from '../../components/CardStandingsPilots';
import CardResultRacing from '../../components/CardResultRacing';

interface SeasonProps {
    position: number;
    Driver: {
        givenName: string;
        familyName: string;
    }
    Constructors: {
        [0]: {
            name: string;
        }
    };
    points: number;
    wins: number;
}

interface RacingProps {
    // PilotDetails: SeasonProps;
    Driver: {
        givenName: string;
        familyName: string;
    }
    Constructor: {
        constructorId: string;
    }
    number: number;
    grid: number;
    laps: number;
    position: number;
    status: string
    points: number
    Time: {
        time: string;
    }

}

export default function Personalizada(): JSX.Element {

    const [season, setSeason] = useState<SeasonProps[]>([]); // temporada
    const [racing, setRacing] = useState<RacingProps[]>([]); // Racing Details

    const [year, setYear] = useState<string>('2023');          // ano 
    const [round, setRound] = useState<string>('last') // número da corrida

    const [loading, setLoading] = useState<boolean>(true)    // loading
    const [loading2, setLoading2] = useState<boolean>(true)    // loading



    const optionsYear = [];
    for (let i = 2023; i >= 1950; i--) {
        optionsYear.push(
            <option
                key={i}
                value={String(i)}
            >
                Ano {i}
            </option>
        );
    }

    const optionsRound = [];
    for (let i = 1; i <= 24; i++) {
        optionsRound.push(
            <option
                key={i}
                value={String(i)}
            >
                Corrida {i}
            </option>
        )
    }

    async function getTemporada(year?: string, round?: string) {
        try {
            const response = await api.get(`${year}/${round}/driverStandings.json?limit=1000`);
            const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            const dataSeasson = response.data.MRData.StandingsTable.season;


            setYear(dataSeasson);
            setSeason(data);
            // console.log(season)


            setLoading(false)



        } catch (error) {
            console.log(error);
        }
    }



    async function getRacing(year?: string, round?: string) {
        try {
            const response = await api.get(`/${year}/${round}/results.json?limit=1000`)
            const data = response.data.MRData.RaceTable.Races[0].Results;

            setRacing(data)
            // console.log(data)

            setLoading2(false)
        }
        catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        getTemporada(year, round);
    }, []);

    useEffect(() => {
        getRacing(year, round)
    }, []);


    // troca o número da temporada
    function handleChangeYear(e: ChangeEvent<HTMLSelectElement>): void {
        setYear(e.target.value);
    }

    // troca o número da corrida
    function handleChangeRound(e: ChangeEvent<HTMLSelectElement>): void {
        setRound(e.target.value);
    }


    async function newSearch(): Promise<void> {
        await getTemporada(year, round);
        await getRacing(year, round);
    }




    return (
        <div className={styles.personalizadaContainer}>
            <h1>Tabela Personalizada</h1>

            <form className={styles.form}>
                <div className={styles.inputSelector}>

                    <label>Escolha a temporada</label>
                    <select onChange={handleChangeYear}>
                        {optionsYear}
                    </select>
                </div>
                <div className={styles.inputSelector}>

                    <label>Escolha a corrida</label>
                    <select onChange={handleChangeRound}>
                        {optionsRound}
                    </select>

                </div>

                <div className={styles.inputSelector}>
                    <input className={styles.inputBotton} type="button" value="Pesquisar" onClick={newSearch} />

                </div>
            </form>

            <br />

            {loading ? (
                <h2>Carregando temporada</h2>
            ) : (

                <div className={styles.cardsContainer}>
                    <table className={styles.tableSeason}>
                        <caption>Temporada de Pilotos {year} - Corrida {round}</caption>
                        <tbody>
                            <tr>
                                <th>Posição</th>
                                <th>Piloto</th>
                                <th>Construtora</th>
                                <th>Pontos</th>
                                <th>Vitórias</th>
                            </tr>

                            {season.map((driver, index) => (
                                <CardStandingsPilots key={index}
                                    Position={driver.position}
                                    GivenName={driver.Driver?.givenName} DriverId={driver.Driver?.familyName}
                                    Team={driver.Constructors[0].name}
                                    Points={driver.points}
                                    Wins={driver.wins}
                                />
                            ))}


                        </tbody>
                    </table>


                </div>
            )
            }

            {loading2 ? (
                <h2>Loading 2............</h2>
            ) : (
                <table className={styles.tableResult}>
                    <caption>Resultado Corrida {round}</caption>
                    <tbody>
                        <tr>
                            <th>Posição</th>
                            <th>Número</th>
                            <th>Piloto</th>
                            <th>Construtora</th>
                            <th>Grid de largada</th>
                            <th>Tempo</th>
                            <th>Voltas Completas</th>
                            <th>Pontos</th>
                            <th>Status</th>
                        </tr>

                        {racing.map((driver, index) => (
                            <CardResultRacing key={index}
                                Position={driver.position}
                                Number={driver.number}

                                GivenName={driver.Driver?.givenName}
                                FamilyName={driver.Driver.familyName}

                                Team={driver.Constructor?.constructorId}

                                Grid={driver.grid}
                                Time={driver.Time?.time}
                                Lap={driver.laps}
                                Points={driver.points}
                                Status={driver.status}
                            />

                        ))

                        }
                    </tbody>
                </table>
            )}
        </div>
    );
}



