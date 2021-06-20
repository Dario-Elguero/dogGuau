require("dotenv").config();
const { Router } = require("express");
const fetch = require("node-fetch");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//const { Dog, Temperament } = require('../db.js')
const { conn, Dog, Temperament } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/dog?name', function(req, res, next){
//     res.send('<h1>index</h1>');
//   })

router.get("/dogs/:idRaza", function (req, res, next) {
  const id = req.params.idRaza;
  //fetch("https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY)
  fetch("http://localhost:3001/dogs")
    .then((response) => response.json())
    .then((json) => {
      
      let dog = json.find(dog => dog.id == id);
      //console.log(dog)
      res.json(dog);
      
    });
    
});

router.get("/dogs", function (req, res, next) {
  const raza = req.query.name;
  if (!raza) {
    fetch("https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY)
      .then((response) => response.json())
      .then((json) => {
        let dogs = json.map((json) => {
          let dog = {
            id: json.id,
            nombre: json.name,
            vida: json.life_span,
            temperamento: json.temperament,
            imagen: json.image.url,
            altura: json.height.metric,
            peso: json.weight.metric,
          };
          return dog;
        });

        Dog.findAll({include: [{
          model: Temperament,
          attributes:['nombre']}]
          })
          .then(dog =>{
              for(let i = 0; i < dog.length; i++){
              var newtempe = ""
                for(let j = 0; j < dog[i].temperaments.length; j++){
                  if (j === dog[i].temperaments.length-1){
                   newtempe += dog[i].temperaments[j].nombre
                  }else{
                   newtempe += dog[i].temperaments[j].nombre + ', '
                  }
                }
          
                dog[i]={
                  id: dog[i].id,
                  nombre: dog[i].nombre,
                  vida: dog[i].vida,
                  peso: dog[i].peso,
                  altura: dog[i].altura,
                  imagen: dog[i].imagen,
                  temperamento: newtempe
                };
            }
            const perros = dog.concat(dogs);
            res.json(perros);
          })
          .catch(error => {
            console.log(error)
            res.send(error)})

      });
      

  } else {
      //fetch("https://api.thedogapi.com/v1/breeds/search?q=" + raza) //api_key=" + API_KEY)
      //fetch("https://api.thedogapi.com/v1/breeds")
      fetch("http://localhost:3001/dogs") 
      .then((response) => response.json())
      .then((json) => {
         
        let dogs = json.filter(dog => dog.nombre.toLowerCase().includes(raza.toLowerCase()))
        
        res.json(dogs);
      });
  }
});

router.post("/dog", async function (req, res, next) {
  console.log(req.body)
   const {tempeId, nombre, vida, imagen, altura_min, altura_max, peso_min, peso_max } = req.body;
     
  const dog = await Dog.create({
    
      id:uuidv4(),
      nombre:nombre,
      altura:altura_min + " - " + altura_max,
      peso:peso_min + " - " + peso_max,
      vida:vida,
      imagen:imagen
    
  })

  await dog.setTemperaments(tempeId)

    res.send('Carga Exitosa')
    //res.redirect('http://localhost:3000/home')
});

router.get("/temperament", function (req, res, next) {
  
  Temperament.findAll()
    .then(categories => {
      res.json(categories);
    })
  //res.json(dog);
  
});

router.get("/pruebas", function (req, res, next) {

  Dog.findAll({where: {
    nombre: {
      [Op.substring]: 'aqui',
    }
  },
  include: [{
    model: Temperament,
    attributes:['nombre']}]
    })
    .then(dog =>{
        for(let i = 0; i < dog.length; i++){
        var newtempe = ""
          for(let j = 0; j < dog[i].temperaments.length; j++){
            if (j === dog[i].temperaments.length-1){
             newtempe += dog[i].temperaments[j].nombre
            }else{
             newtempe += dog[i].temperaments[j].nombre + ', '
            }
          }
    
          dog[i]={
            id: dog[i].id,
            nombre: dog[i].nombre,
            vida: dog[i].vida,
            peso: dog[i].peso,
            altura: dog[i].altura,
            imagen: dog[i].imagen,
            temperamento: newtempe
          };
      }
      //const perros = dog.concat(dogs);
      res.json(dog);
      
    }) 
  
});

module.exports = router;
