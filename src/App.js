//import './global.css';

import styles from './styles/global.module.scss'
import RoutesApp from "./routes";


function App() {
  return (
    <div className={styles.app}>
      
      <RoutesApp />
    </div>
  );
}

export default App;