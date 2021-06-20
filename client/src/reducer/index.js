
const initialState = {
    dogsfav: [], //Favoritos
    dogslist: [], //por el momento todas las Razas
    detail: {}, //Detalle Dogs
    temperamentos:[], //todos los temperamentos
    finddog:[] // Busqueda de Raza por nombre o temperamento
};

function rootReducer(state = initialState, action) {
    
    if (action.type === "GET_DOG") {
        return {
          ...state,
          dogslist: action.payload
        };
    }

    if (action.type === "FIND_DOG") {
      return {
        ...state,
        //finddog: action.payload
        dogslist: action.payload
      };
  }
  if (action.type === "ORD_ASC") {
    return {
      ...state,
      //finddog: action.payload
      dogslist: [...state.dogslist].sort((a,b) => a.nombre > b.nombre ? 1 : -1)
    };
}
if (action.type === "ORD_DES") {
  return {
    ...state,
    //finddog: action.payload
    dogslist: [...state.dogslist].sort((a,b) => a.nombre < b.nombre ? 1 : -1)
  };
}

    if (action.type === "ADD_TEMPE_FORM") {
      return {
        ...state,
        tempe: state.movies.concat(action.payload)
      }
    }

    if (action.type === "ADD_TEMPERAMENT") {
      return {
        ...state,
        temperamentos: action.payload
      }
    }

    if (action.type === "DOG_DETAIL") {
      return {
        ...state,
        detail: action.payload
      };
  }

  if (action.type === "FIND_DOG_TEMP") {
        
        //console.log("XXX",state.dogslist,action.payload)
    return {
      ...state,
      dogslist: state.dogslist.filter(dog => dog.temperamento?.toLowerCase().includes(action.payload.toLowerCase()))
    };
}
    
    return state;
  }
  
  export default rootReducer;