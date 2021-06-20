import React, { Fragment , useEffect, useState } from "react";
import './Form.css';
import { addTemperaments } from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import store from '../../store';
import {addRaza} from '../../actions/index'

const Form = () => {
  const initialState = {
    nombre:"",
    vida:"",
    peso_min:"",
    peso_max:"",
    altura_min:"",
    altura_max:"",
    imagen:"",
    peso:"",
    tempeId:[]
  }
  const [newRaza, setNewRaza] = useState(initialState);
 
  const [exito, setExito] = useState(false);
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Submitting Name ${name}`)
    // alert(`Submitting Name`)
    dispatch(addRaza(newRaza))
    }
    
    const controlMinMax = (e)=> {
      let minP = newRaza.peso_min;
      let minA = newRaza.altura_min;
      let max = e.target.value;
      if(e.target.value <= minP || e.target.value <= minA){
          //alert('Cuidado, no seria un Peso Maximo')
          e.target.value = "";
          console.log(e.target)
          max = prompt('Cuidado,no seria un Peso Maximo, Ingrese Nuevo Valor');
          e.target.value = max;
          e.target.focus()
        }
     
    }
    const goFocus = (e) => {
      if (e.target.name === 'peso_min'){
          if(!e.target.value){
            alert('No puede estar vacio')
            e.target.value = 1
          }else{
             document.getElementById('peso_max').focus()
          }
        }
      
      if (e.target.name === 'altura_min'){
        if(!e.target.value){
          alert('No puede estar vacio')
          e.target.value = 1
          
        }else{
        document.getElementById('altura_max').focus()
        }
      }
    }
    const handleChange = (e) => {
      
      setNewRaza({
        ...newRaza,
        [e.target.name]: e.target.value
      })

    }
    const tempe = (e) => {
      setNewRaza({
      ...newRaza,
      tempeId: newRaza.tempeId.concat(Number(e.target.value))}
    )};

  const temperaments = useSelector(store => store.temperamentos)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(addTemperaments())
    
},[])

temperaments.sort((a,b) => a.nombre < b.nombre ? -1 : +(a.nombre > b.nombre))

    function getValue(e) {
    
      let optSelec = e.target.options[e.target.selectedIndex].text
      let cod = e.target.value
      
      let tempera = document.getElementById('rootTempe');
      tempera.innerHTML+= `
      <div className="checkTempe"><label Htmlfor="tempeId">${optSelec}</label>
          <input type="checkbox"
          name="tempeId"
          value="${cod}" checked/>
      </div>
      `
      tempe(e)
    }
    
    if(exito){
      let aviso = document.getElementById('aviso');
      aviso.className="aviso"
    }else{
      let aviso = document.getElementById('aviso');
      console.log(aviso)
      //aviso.className="noaviso"
      
    }
 
  return (
    <Fragment>
      
      <div className="aviso" id="aviso">
            <h3>La raza se creo CORRECTAMENTE</h3>
      </div>
      
      <div className='cont_gral'>
      {/* <form className='form' method="post" action="http://localhost:3001/dog"> */}
      <form className='form' onSubmit={handleSubmit}>
    <div className="container">
      <h1>Crear Nueva Raza</h1>
      
      <h3>Nombre de Raza</h3>
       <div><input onChange={handleChange} name="nombre" placeholder="Nombre de Raza" required /></div>
       
       <h3>Años de Vida</h3>
       <div><input type="number" onChange={handleChange} name="vida" placeholder="Años de Vida" width='500px' required /></div>
       
       <h3>Peso</h3>
       <div><input onChange={handleChange} onBlur={goFocus} className="medida" name="peso_min" placeholder="Minimo" required />
       <input onChange={handleChange} onBlur={controlMinMax} className="medida" id='peso_max' name="peso_max" placeholder="Maxímo" required /></div>
       
       <h3>Altura</h3>
       <div><input onChange={handleChange} onBlur={goFocus} className="medida" name="altura_min" placeholder="Minimo" required />
       <input onChange={handleChange} onBlur={controlMinMax} className="medida" id='altura_max' name="altura_max" placeholder="Maxímo" required /></div>

       <div><input onChange={handleChange} name="imagen" placeholder="Url Imagen" required /></div>
       {/* <div><input type="file" name="file" placeholder="Url Imagen" /></div> */}
    </div>

        <div className="temp">
          <h2 className="h2">Temperamentos:</h2>
          <select className="seleForm" id='tem' onChange={getValue}>
            {temperaments.map(tempe =>{
              return <option value={tempe.id} key={tempe.id}>{tempe.nombre}</option>
            })}
           
          </select>

            <div className="rootTempe" id="rootTempe">

            </div>


        </div>
        <div className="boton">
        <input className="btn" type="submit" value="Guardar" />
        </div>
    </form>
    </div>
    </Fragment>
  );
};

export default Form;
