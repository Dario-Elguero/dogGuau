import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { findDogs, addDogs, addTemperaments, findDogsTemp } from '../../actions/index';
import Logo from '../img/logo.png'
import './Navbar.css';

    

export default function NavBar() {
    const [name, setName] = useState("");
    const dispatch = useDispatch()
    
    const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(findDogs(name))
    }

    const temperaments = useSelector(store => store.temperamentos)
    const dogslist = useSelector (store => store.dogslist)
    useEffect(()=>{
    dispatch(addTemperaments())
    
    },[])
    
    temperaments.sort((a,b) => a.nombre < b.nombre ? -1 : +(a.nombre > b.nombre))

    function selectChange(e) {
      
      let optSelec = e.target.options[e.target.selectedIndex].text
    
      dispatch(findDogsTemp(optSelec,dogslist))
      
    }


    return (
        <header className="navbar">
            <div>
                <img className="logoIco" id="logoHenry" src={Logo} width="50" height="50" alt="" />
            </div>
            <button className="btn btnhome" onClick={()=> dispatch(addDogs())}>Ver Todos</button>

           <select className="seleForm" id='tem' onChange={selectChange}>
            {temperaments.map(tempe =>{
              return <option value={tempe.id} key={tempe.id}>{tempe.nombre}</option>
            })}
           </select>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="title"
              autoComplete="on"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            {/* <NavLink type="submit" to="/home"> */}
             <button className="btn btnhome" type="submit">BUSCAR</button>
            {/* </NavLink> */}
          </div>
          
        </form>

            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/home" >Home</NavLink>
                        {/* <NavLink to="/razas" >Razas</NavLink> */}
                        <NavLink to="/home/addraza" >Add Raza</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}