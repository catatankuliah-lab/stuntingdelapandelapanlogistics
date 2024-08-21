const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const VendorArmada = require('../models/vendorArmadaModel');

const getAllVendorArmada = async (req, res) => {
    try {
        const dataVendorArmada = await VendorArmada.findAll();
        res.status(200).send(dataVendorArmada);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Vendor Armada', error);
    }
};

const getTersediaVendorArmada = async (req, res) => {
    try {
        const queryTersedia = `SELECT * FROM vendor_armada WHERE status_vendor = 'TERSEDIA'`;
        const results = await sequelize.query(queryTersedia, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Belum Ada Vendor');
    }
};

const getTidakTersediaVendorArmada = async (req, res) => {
    const { id } = req.params;
    try {
        const queryTidakTersedia = `DELETE FROM sjt_2408 WHERE id_sjt = :id`;
        await sequelize.query(queryTidakTersedia, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hapus WO Gagal : ' + error);
    }
};

module.exports = {
    getAllVendorArmada,
    getTersediaVendorArmada,
    getTidakTersediaVendorArmada
};