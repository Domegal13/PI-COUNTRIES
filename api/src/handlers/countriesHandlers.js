const {
    getApiCountries,
    getCountryById,
    getCountryByName,
    getCountries,
} = require("../controllers/countriesControllers");

const CountriesHandler = async(req, res) => {
    const { id } = req.params;
    const { name } = req.query;
   
    try {
        
            if (id) {
                const countryId = await getCountryById(id);
                countryId.length ? 
                res.status(200).send(countryId) :
                res.status(401).send(" Id Invalid "); 
            }  
            else if(name) {
                const countryName = await getCountryByName(name)
                countryName.length ? 
                res.status(200).send(countryName) :
                res.status(401).send("Country Invalid");
            }
            else {
                const allCountries = await getCountries();
                res.status(200).send(allCountries);  
            }
        
    } catch (error) {
        res.status(400).json({Error : error.mesaje});
    }

};


module.exports = {
    //countriesHandler,
    CountriesHandler,
}