const { Router } = require("express");

const { 
         CountriesHandler,
        
    } = require("../handlers/countriesHandlers");

const countriesRouter = Router();


countriesRouter.get("/", CountriesHandler);

countriesRouter.get("/:id", CountriesHandler);


module.exports = countriesRouter;