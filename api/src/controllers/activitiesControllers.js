
const { Op } = require("sequelize");

const { Activity, Country } = require("../db");



const getAllActivities = async () =>{
   const getActivities = await Activity.findAll();
    getActivities? getActivities : [];

};

const createActivity = async ( name, difficulty, duration, season, countriesId) => {
  
  try {
     
    if (isNaN(difficulty)) {
        res.status(401).send(" Ingrese valores numericos para difficulty");
    };

    if (isNaN(duration)) {
      res.status(401).send(" Ingrese valores numericos para duration");
    };

      const [createActivity, created ] = await Activity.findOrCreate({ where : { name }, defaults: {  difficulty, duration, season }})

      for (let country of countriesId) {
          const relationCountries = await Country.findOne({ where: {name : {[Op.iLike]: country}} })
          createActivity.addCountry(relationCountries)
      }

      created ? 
      console.log("Activity was successfully created")
      : console.log("Activity related to the country indicated");
     //  res.send({msg: 'La actividad fue creada con exito'}) 
     //  : res.send({msg: 'La actividad ya existia y fue relacionada al pais indicado'});
          

  } catch (error) {
      console.log(error);
  }
};

module.exports = { createActivity, getAllActivities};

