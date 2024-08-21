const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Armada = require('../models/armadaModel');

const getAllArmada = async (req, res) => {
    try {
        const dataAramda = await Armada.findAll();
        res.status(200).send(dataAramda);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Armada', error);
    }
};

module.exports = {
    getAllArmada
};