import { useState, useEffect } from "react";
import api from '../../Services/api';
import CardStandingsPilots from "../../components/CardStandingsPilots";
import React from "react";

import styles from './home.module.scss';
import CardConstructors from "../../components/CardStandingsConstructors";



export default function Home() {
  const [driverStandings, setDriverStandings] = useState<DriverStandingsProps[]>([])
  const [constructorStandings, setConstructorStandings] = useState<ConstructorsStandingsProps[]>([])

  const [season, setSeason] = useState<number>(0);
  const [round, setRound] = useState<number>(0);


  interface DriverStandingsProps {
    position: number;
    Driver: {
      givenName: string;
      familyName: string
    }
    Constructors: {
      [0]: {
        name: string;
      }
    };

    points: number;
    wins: number;
  }

  interface ConstructorsStandingsProps {
    position: number;
    Constructor: {
      name: string;
    }
    points: number;
    wins: number
  }

  async function getdriverStandings() {
    try {
      const response = await api.get('current/driverStandings.json?limit=100')
      // const data = response.data.MRData.StandingsTable.StandingsLists;
      const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      const dataSeasson = response.data.MRData.StandingsTable.season;
      const dataRound = response.data.MRData.StandingsTable.StandingsLists[0].round;


      setDriverStandings(data)
      setSeason(dataSeasson)
      setRound(dataRound)

      // console.log(data)

    } catch (error) {
      console.log(error)
    }

  }

  async function getConstructorsStandings() {
    const response = await api.get(`current/constructorStandings.json?limit=100`)
    const data = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    setConstructorStandings(data)
    // console.log(data)

  }



  useEffect(() => {
    getdriverStandings()
    getConstructorsStandings()
  }, [])

  return (
    <div className={styles.app}>

      <div className={styles.homeContainer}>
        <h1>Portal-F1</h1>

        <section>
          <h2>Seja Bem Vindo ao Portal-F1</h2>

          <p>Aqui você encontra os resultados de todas as temporadas, pilotos e os
            detalhes de cada corrida que desejar
          </p>

          <ul>
            <li>
              Na página <strong>Principal</strong> você tem a classificação de Pilotos e de construtores
            </li>

            <li>
              Na página de <strong>Pilotos</strong> tem a opção de escolher todos pilotos por temporada
            </li>

            <li>
              Na página <strong>Temporadas</strong> tem detalhes da classificação final de todas as temporadas
            </li>

            <li>na Página <strong>Personalizada</strong> pode selecionar a temporada e a corrida específica para ver detalhes do campeonato e da corrida específica.
            </li>
          </ul>
        </section>



      </div>
        <aside className={styles.aside}>

          <table className={styles.tablePilots}>
            <caption>Temporada de Pilotos {season} - Corrida {round}</caption>

            <tbody>
              <tr>
                <th>Posição</th>
                <th>Piloto</th>
                <th>Team</th>
                <th>Pontos</th>
                <th>Vitórias</th>
              </tr>


              {
                driverStandings.map((driver, index) => {
                  return (
                    <CardStandingsPilots key={index}
                      Position={driver.position}

                      GivenName={driver.Driver?.givenName} DriverId={driver.Driver?.familyName}
                      Team={driver.Constructors[0].name}
                      Points={driver.points}
                      Wins={driver.wins}


                    />
                  )
                })
              }
            </tbody>
          </table>

          <table className={styles.tableConstructors}>

            <caption>Temporada de Construtores {season} - Corrida {round}</caption>
            <tbody>


              <tr>
                <th>Posição</th>
                <th>Equipe</th>
                <th>Pontos</th>
                <th>Vitórias</th>
              </tr>

              {constructorStandings.map((team, index) => {
                return (
                  <CardConstructors key={index}
                    Position={team.position}
                    Name={team.Constructor?.name}
                    Points={team.points}
                    Wins={team.wins}
                  />
                )
              })}

            </tbody>

          </table>

        </aside>


    </div>

  );
}


