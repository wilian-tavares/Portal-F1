
import { Link } from 'react-router-dom';
import React from 'react';

import styles from './header.module.scss'



export default function Header(): JSX.Element {

    return(
         <div className={styles.containerHeader}>
             <Link to='/'>
                <h1 className={styles.logo}>Portal F1</h1>
             </Link>
        
       
            <nav>
                <ul>
                    <li>
                        <Link to='/drivers'>Pilotos</Link>
                    </li>

                    <li>
                        <Link to='/seasons' >Temporadas</Link>
                        
                    </li>

                    <li>
                        <Link to='/personalizada' >Personalizada</Link>
                        
                    </li>
                </ul>
            </nav>
        </div>
    )
}