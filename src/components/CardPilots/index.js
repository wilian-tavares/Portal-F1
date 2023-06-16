import styles from './cardPilots.module.scss'

export default function CardPilots({ Position, GivernName, DriverId, Points, Wins}){
    return(
        <tr className={styles.containerCardPilots}>
              <td>{Position}°</td>
              <td>{GivernName} {DriverId}</td>
              <td>{Points}</td>
              <td>{Wins}</td>
        </tr>
    )
}