const { Sequelize, Op } = require("sequelize");

const { createActivity, getAllActivities} = require("../controllers/activitiesControllers");
const {Country, Activity} = require("../db");

// const createActivities = async (req, res) =>{
//    const { name, difficulty, duration, season, countries} = req.body;
//    try {


//     // const newActivity = await createActivity(name, difficulty, duration, season);

//    //  createActivity();
//    //  res.status(200).send('Activity related to the country indicated');

   

//    const activitiesCreated = await createActivity(name, difficulty, duration, season, countries)
//    const actCreated = activitiesCreated ? 
//       res.status(200).send(actCreated) :
//       res.status(400).send("Activity related to the country indicated") ;

//    } catch (error) {
//       console.log(error);
//    }
// };


const allActivities = async (req, res) => {
   try {
      const allAct = getAllActivities();
      res.status(200).send(allAct);
      
   } catch (error) {
      res.status(400).json({ error : error.message });
   }
};

const createActivities =  async (req, res,) => {
   const { name, difficulty, duration, season, countriesId } = req.body;

   try {

      //if (!name || !difficulty || !duration || !season || !countriesId) throw Error("Missing Data");
      
      const [createActivity, created ] = await Activity.findOrCreate({ where : { name }, defaults: {  difficulty, duration, season }})

      for (let country of countriesId) {
         const relationCountries = await Country.findOne({ where: {name : {[Op.iLike]: country}} })
         createActivity.addCountry(relationCountries)
      }

      created ? 
      res.send("Activity was successfully created")
      : res.send("Activity related to the country indicated");
           

   } catch (error) {
      
      res.status(400).json({ error : error.message });
      
   }
};

module.exports = {
    createActivities,
    allActivities,
};