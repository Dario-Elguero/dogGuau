import React from 'react';
import './Card.css';
import Logo from '../img/logo.png'



const card = ({pagina}) => {
    let {id,nombre,imagen,temperamento} = pagina
    if (imagen === 'SIN URL'){imagen = Logo }
    return (
        <div className='card' id={id}>
           <img className='imgCard'
            src={imagen}
            alt="Nada"
           />
           <h2 className="titulo">{nombre}</h2>
           <p className='tempe'>{temperamento}</p>
        </div>
    )
}

export default card
