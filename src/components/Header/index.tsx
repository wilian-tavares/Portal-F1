
import { Link } from 'react-router-dom';
import React from 'react';



export default function Header(): JSX.Element {

    return(
         <div className='containerHeader'>
             <Link to='/'>
                <h1 className='logo'>Portal F1</h1>
             </Link>
        
       
            <nav>
                <ul>
                    <li>
                        <Link to='/drivers'>Pilotos</Link>
                    </li>

                    <li>
                        <Link to='/classificacao' >Classificacao</Link>
                        
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