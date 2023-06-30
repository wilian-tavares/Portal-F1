
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Personalizada from './pages/Personalizada';
import Seasons from './pages/Seasons';
import Error from './pages/Error';
import Header from './components/Header';

export default function RoutesApp() {
    return(
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/drivers' element={ <Drivers />} />
                <Route path='/seasons' element={ <Seasons />} />
                <Route path='/personalizada' element={ <Personalizada />} />

                <Route path='/*' element={ <Error />} />

            </Routes>
        </BrowserRouter>

    )
}