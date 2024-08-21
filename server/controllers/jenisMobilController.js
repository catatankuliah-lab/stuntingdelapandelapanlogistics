const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const JenisMobil = require('../models/jenisMobilModel');

const getAllJenisMobil = async (req, res) => {
    try {
        const dataJenisMobil = await JenisMobil.findAll();
        res.status(200).send(dataJenisMobil);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Vendor Armada', error);
    }
};

module.exports = {
    getAllJenisMobil
};