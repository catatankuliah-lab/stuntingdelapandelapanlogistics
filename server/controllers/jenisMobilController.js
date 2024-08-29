const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const JenisMobil = require('../models/jenisMobilModel');

const getAllJenisMobil = async (req, res) => {
    try {
        const query = `
            SELECT * FROM jenis_mobil WHERE id_jenis_mobil
        `;
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results.length ? results : []);
    } catch (error) {
        console.error(error);
        res.status(500).send('Belum Ada Jenis Mobil');
    }
};

module.exports = {
    getAllJenisMobil
};