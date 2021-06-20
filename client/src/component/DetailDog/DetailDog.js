import React, {Fragment, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Logo from '../img/logo.png';
import imgLoading from '../img/dog_loader.gif';
import './DetailDog.css';

const DetailDog = () => {

const detail = useSelector(store => store.detail)
const [loading, setLoading] = useState(true)
const {idFind} = useParams();
console.log(idFind);
useEffect(()=>{
    setLoading(false)
},[])
     // console.log(loading)
    // setLoading(false)
    let {id,nombre,imagen,temperamento,vida, altura, peso} = detail
    
    if (imagen === 'SIN URL'){imagen = Logo }
    return(
        <>
        {loading ? (
            <div>
            <h1>Loading...</h1>
            <img src={imgLoading}  alt="loading"/>
            </div>)
        :
        (    
        <>
        <h1 className="h1Det">DETALLES DE LA RAZA</h1>
        
        <div className='cardDetail' id={id}>
            <div>
                <img className='imgCard2' src={imagen} alt={nombre}/>
            </div>
            <div className="cardDetail2">
                <div className="titleRaza">{nombre}</div>
                <div className="vap">
                    <div className="vapSub">
                    <div className="titleSub">VIDA</div> {vida}
                        </div>
                    <div className="vapSub">
                    <div className="titleSub">ALTURA</div> {altura}
                        </div>
                    <div className="vapSub">
                    <div className="titleSub">PESO</div> {peso}
                        </div>
                </div>
                <div className='te'>
                    <div className="titleTempe">Temperamentos:</div>
                <p className='tempe'>{temperamento}</p>
                </div>
            </div>
        </div>
        <div className="volver">
            <NavLink className="btn volver" exact to="/home" >Volver</NavLink>
        </div>
                
        </> )
        }
        </>
    )
}

export default DetailDog