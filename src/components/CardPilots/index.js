import styles from './cardPilots.module.scss'

export default function CardPilots({ Position, GivernName, DriverId, Points, Team, Wins}){
    return(
        <tr className={styles.containerCardPilots}>
              <td>{Position}°</td>
              <td>{GivernName} {DriverId}</td>
              <td>{Team}</td>
              <td>{Points}</td>
              <td>{Wins}</td>
        </tr>
    )
}