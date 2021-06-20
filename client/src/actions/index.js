import Dogs from "../component/dogs/Dogs1"
import axios from 'axios';
require("dotenv").config();
const {
  LOCALHOST, PORT_BACK } = process.env;

export function addDogs(){
  return function(dispatch){
  return fetch(`http://${LOCALHOST}:${PORT_BACK}/dogs`)
    .then(response => response.json())
    .then(response =>{

      dispatch({type:'GET_DOG', payload: response})
    })
   
  }
}

export function findDogs(nombre){
  return function(dispatch){
  return fetch("http://localhost:3001/dogs?name=" + nombre)
    .then(response => response.json())
    .then(response =>{

      dispatch({type:'FIND_DOG', payload: response})
    })
   
  }
}


export function addTemperaments(){
  return function(dispatch){
    return fetch("http://localhost:3001/temperament")
    .then(response => response.json())
    .then(response =>{
      
      dispatch({type:'ADD_TEMPERAMENT', payload: response})
    })
    
  }
}

export function addTempeForm(payload) {
  return { type: "ADD_TEMPE_FORM", payload };
}

export function getDogDetail(id) {
  return function(dispatch) {
    return fetch("http://localhost:3001/dogs/" + id)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DOG_DETAIL", payload: json });
      });
    };
  }
  
export function ordAscendente() {
  return function(dispatch) {
   
    return dispatch({ type: "ORD_ASC"});
  }
  
}
export function ordDescendente() {
  
  return { type: "ORD_DES" };
}

  export function findDogsTemp(nombreTempe){
      return function(dispatch){
          
      return dispatch({type:'FIND_DOG_TEMP', payload: nombreTempe})
    }
  }

  export function addRaza(raza) {
    return function(dispatch) {
      return axios.post("http://localhost:3001/dog", raza)
        .then(json => {
          console.log(json.data)
          return {type:'ADD_RAZA', payload: json.data}
        })
        .catch(error=>error);
      };
    }