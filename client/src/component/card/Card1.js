import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { addDogs, getDogDetail } from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import './Card.css';
import Logo from '../img/logo.png'



const Card = ({dogslist, loading}) => {
    const dispatch = useDispatch();
    // let {id,nombre,imagen,temperamento} = pagina
    // if (imagen === 'SIN URL'){imagen = Logo }
    if(loading){
        return (
          <div><h1>Loading...</h1></div>
        )
    }
    return (
        <Fragment>
        {dogslist.map(pagina =>(
            <div key={pagina.id} className='card' id={pagina.id}>
                <NavLink className="info" onClick={()=>dispatch(getDogDetail(pagina.id))} to={`/raza/${pagina.id}`}>
            <img className='imgCard'
                src={pagina.imagen}
                alt={pagina.nombre}
            />
            
            <h2 className="titulo">{pagina.nombre}</h2>
            <p className='tempe'>{pagina.temperamento}</p>
            </NavLink>
            </div>
        ))}
        </Fragment>
    )
}

export default Card
