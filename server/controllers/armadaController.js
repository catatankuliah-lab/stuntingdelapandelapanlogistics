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

const addArmada = async (req, res) => {
    const {
        id_vendor,
        id_jenis_mobil,
        nopol_mobil_armada,
        status_armada,
        lokasi_terakhir
    } = req.body;
    try {
        const newArmada = await Armada.create({
            id_vendor,
            id_jenis_mobil,
            nopol_mobil_armada,
            status_armada,
            lokasi_terakhir
        });
        res.status(200).send(newArmada);
    } catch (error) {
        console.error(req.body);
        res.status(500).send(error);
    }
};

const getFilteredArmada = async (req, res) => {
    const { id_vendor, id_jenis_mobil, status_armada } = req.body;
    let query = `
        SELECT 
            armada.*, 
            vendor_armada.nama_vendor,
            jenis_mobil.nama_jenis_mobil
        FROM armada 
        LEFT JOIN vendor_armada ON armada.id_vendor = vendor_armada.id_vendor
        LEFT JOIN jenis_mobil ON armada.id_jenis_mobil = jenis_mobil.id_jenis_mobil
        WHERE 1=1`;

    let replacements = {};

    if (id_vendor && id_vendor !== "0") {
        query += ` AND armada.id_vendor = :id_vendor`;
        replacements.id_vendor = id_vendor;
    }

    if (id_jenis_mobil && id_jenis_mobil !== "0") {
        query += ` AND armada.id_jenis_mobil = :id_jenis_mobil`;
        replacements.id_jenis_mobil = id_jenis_mobil;
    }

    if (status_armada && status_armada !== "TAMPILKAN SEMUA") {
        query += ` AND armada.status_armada = :status_armada`;
        replacements.status_armada = status_armada;
    }

    try {
        const results = await sequelize.query(query, {
            replacements: replacements,
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results.length ? results : []);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
};


module.exports = {
    getAllArmada,
    addArmada,
    getFilteredArmada
};