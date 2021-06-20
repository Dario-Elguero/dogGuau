import React, {Fragment, useEffect, useState} from 'react';
import { addDogs, getDogDetail } from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import store from '../../store';
import Card from '../card/Card';
import './Dogs.css';
import { NavLink } from 'react-router-dom';
function ordAsc(pagina) {
   pagina.sort((a,b) => a.nombre < b.nombre ? -1 : +(a.nombre > b.nombre))
 }
 function ordDesc(pagina) {
  pagina.sort((a,b) => a.nombre < b.nombre)
}
 
const Dogs = ()=> {
  const dogslist = useSelector(store => store.dogslist)
  //console.log('DOGLIST',dogslist);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
  
      dispatch(addDogs())
      setLoading(false)
      //console.log('STORE',store);
      //console.log('DOGLIST',dogslist.dogslist);
  },[])
  let pagina = dogslist.slice(0,9);
  
  ordAsc(pagina)
  //console.log('ASC',pagina);
  
  //pagina.reverse()
  //console.log('DESC',pagina);

if(loading){
  return (
    <div><h1>Loading...</h1></div>
  )
}
 return ( 
   <Fragment>
    <div className="ordenado">
      <button className="btn btnhome" onClick={()=> console.log(pagina)}>Ord. Asc.</button>
      <button className="btn btnhome" onClick={()=>pagina.reverse()}> Ord. Desc.</button>
     </div>
   <div className="dogs">
     
     {pagina.map(pagina =>{
      
       return(
        <NavLink onClick={()=>dispatch(getDogDetail(pagina.id))} key={pagina.id} to={`/raza/${pagina.id}`}>
        <div id={pagina.id} key={pagina.id} className="dog-detail">
          <Card pagina={pagina}/>
        </div>
        </NavLink>
        )
        
        })}
       
    </div>
    </Fragment>
      );
    
}

  export default Dogs;