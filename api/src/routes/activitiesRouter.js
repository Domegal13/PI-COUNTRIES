const { Router } = require("express");

const { createActivities, allActivities } = require("../handlers/activitiesHandlers");
const { Activity, Country } = require("../db");

const activitiesRouter = Router();

const validateActivities = (req, res, next) => {
    const {name, difficulty, duration, season, countriesId } = req.body;
    if (!name || !difficulty || !duration || !season || !countriesId) 
        res.status(400).json({error : "Missing Data"});

    next();
}

activitiesRouter.get("/", allActivities);
activitiesRouter.post("/", validateActivities, createActivities);






module.exports = activitiesRouter;