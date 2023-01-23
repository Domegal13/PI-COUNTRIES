const axios = require('axios');
const { Country, Activity } = require('../db.js');


// Para remover acentos y caracteres especiales
// const removeAccents = (str) => {
//     return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//   } 

const getApiCountries = async () => {
    try {
        const countriesData = await Country.findAll();

        if(!countriesData.length) {
            const apiAllCountries = (await axios.get('https://restcountries.com/v3/all')).data.map(country => (
                {
                   id : country.cca3,
                   name : country.name.common.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),   
                   flag : country.flags[1],
                   continents : country.continents.toString(),
                   capital : country.capital? country.capital.toString() : "Unknown",
                   subregion : country.subregion,
                   area : country.area + " Km2",
                   population : country.population,
                }
            ));

            await Country.bulkCreate(apiAllCountries);
            console.log('Countries add in DB');
           
        }
    } catch (error) {
        console.log(error);     
    }
};

const insertActivityInCountries = async ()=> {
    
    return await Country.findAll({
        include : {
            model : Activity,
            attributes : ['name', 'difficulty', 'duration', 'season'],
            through : {
                attributes : [],
            }
        }
    });
    //return insert;
};


const getCountryById = async (id) => {
    try {
        
        const getAllCountries = await insertActivityInCountries();
        const countryFoundById = getAllCountries.filter(elem => elem.id.toUpperCase() === id.toUpperCase());

        return countryFoundById;
        
    } catch (error) {
        console.log(error);
    };

};

const getCountryByName = async (name) => {
    try {
        
         const getAllCountries = await insertActivityInCountries();
         const countryFoundByName = getAllCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
      
         return countryFoundByName;

        
    } catch (error) {
        console.log(error);
    };

};


const getCountries = async () => {

    const getAllCountries = await insertActivityInCountries();

    const loadCountries = getAllCountries.map(country => ({
        id : country.id,
        name : country.name,
        flag : country.flag,
        continents : country.continents,
        population : country.population,
        activities : country.activities,

    }));

    return loadCountries;

};





module.exports = {
    getApiCountries,
    insertActivityInCountries,
    getCountryById,
    getCountryByName,
    getCountries,
};
