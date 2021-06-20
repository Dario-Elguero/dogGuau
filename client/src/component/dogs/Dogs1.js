import React, {Fragment, useEffect, useState} from 'react';
import { addDogs, getDogDetail, ordAscendente, ordDescendente } from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import store from '../../store';
import Card from '../card/Card1';
import Pagination from '../Pagination/Pagination';
import './Dogs.css';

const Dogs = ()=> {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(10)
    const dogslist = useSelector(store => store.dogslist)
  //console.log('DOGLIST',dogslist);

    const handleClick = (e) => {
    e.preventDefault();
    //console.log(e.target.name)

      if (e.target.name === "asc"){
          dispatch(ordAscendente())
      }
      if(e.target.name === "des"){
          dispatch(ordDescendente(dogslist))
      }
    
    }

  const dispatch = useDispatch();
  
  useEffect(()=>{
  setLoading(true)
      dispatch(addDogs())
      setLoading(false)
      
  },[])
  //let pagina = dogslist.slice(0,9);
 
  const indexUltimoDog = currentPage * dogsPerPage;
  const indexPrimerDog = indexUltimoDog - dogsPerPage;
  const currentDogs = dogslist.slice(indexPrimerDog,indexUltimoDog);
  //pagina.reverse()
  //console.log('DESC',pagina);
  //CAMBIAR PAGINA
  const paginate = (nroPagina) => setCurrentPage(nroPagina);

if(loading){
  return (
    <div><h1>Loading...</h1></div>
  )
}
 return ( 
   <Fragment>
    <div className="ordenado">
      {/* <button className="btn btnhome" onClick={()=>dispatch(ordAscendente(dogslist))}>Ord. Asc.</button>
      <button className="btn btnhome" onClick={()=>dispatch(ordDescendente(dogslist))}> Ord. Desc.</button> */}
      <input className="btn btnorden" type="submit" value="A→Z" name="asc" onClick={handleClick}/>
      <h4>-ORDENAR-</h4>
      <input className="btn btnorden" type="submit" value="Z→A" name="des" onClick={handleClick}/> 
      <h4>-CANT. POR PAGINA-</h4>
      <select defaultValue="10" onChange={(e)=>setDogsPerPage(e.target.value)} className="paginado">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
     </div>
    <div className="pagina">
    <Pagination dogsPerPage={dogsPerPage} totalDogs={dogslist.length} paginate={paginate} /> 
    </div>
   <div className="dogs">
      <Card dogslist={currentDogs} loading={loading} />
    </div>
    <div className="pagina">
    <Pagination dogsPerPage={dogsPerPage} totalDogs={dogslist.length} paginate={paginate} /> 
    </div>
 
    </Fragment>
      );
    
}

  export default Dogs;