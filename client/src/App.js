import './App.css';
import './component/inicio/inicio'
import Inicio from './component/inicio/inicio';
import NavBar from './component/NavBar/NavBar';
import Dogs1 from './component/dogs/Dogs1';
import Form from './component/form/Form';
import DetailDog from './component/DetailDog/DetailDog';
import {Route} from 'react-router-dom';
{/* <Route exact path="/" component={Inicio} />
          <Route path="/favs" component={Favorites} />
           /> */}
function App() {
  return (
    <div className="App">
      <Route path="/home" component={NavBar}/>
      <Route exact path="/" component={Inicio} />
      <Route path="/home/addraza" component={Form}/>
      <Route exact path="/home" component={Dogs1} />
      <Route path="/raza/:id" component={DetailDog}/>
      
    </div>
    )
}

export default App;
