import './Inicio.css';
import Pata1 from '../img/pata_go.png';
import Pata2 from '../img/pata_entrar.png';
import LogoInicial from '../img/logo_completo.png';
import { NavLink } from 'react-router-dom';

function Inicio() {
    return (
      <div className="Ini">
        <img className='logo' alt='logo_inicial' src={LogoInicial}/>
        <NavLink to="/home" >
          <div class="flip">
            <img src={Pata1} alt="logo_pata1" class="flip-1"/>
            <img src={Pata2} alt="logo_pata2" class="flip-2"/>
        </div>
        </NavLink>
      </div>
    );
  }
  
  export default Inicio;
