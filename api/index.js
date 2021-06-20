//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const server = require("./src/app.js");
const { conn, Temperament } = require("./src/db.js");
const fetch = require("node-fetch");

const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  fetch("https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY)
    .then((response) => response.json())
    .then((json) => {
      var result = "";
      for (raza of json) {
        if (raza.temperament) {
          result = result + raza.temperament;
          //  JSON.parse(raza.temperament)
        }
      }
      var array = result.split(", ");

      var sinRepArray = new Set(array);
      //console.log('XXXXXXXXXXX',sinRepArray.keys());
      //var tempe = [];
      //for (let item of sinRepArray.keys()) tempe.push(item);
      for (let item of sinRepArray){
        //console.log(item);
        Temperament.create({
          nombre: item,
        })
        .catch(error =>{
          console.error(error)
        })
      }
      // tempe.forEach((temp) => {
      //   Temperament.create({
      //     nombre: temp,
      //   })
      //   .catch(error =>{
      //     //console.error('error')
      //   })
      // });
    })
    .catch((error) => {
      console.error("error", error);
    });
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
//cargaTemperament();
