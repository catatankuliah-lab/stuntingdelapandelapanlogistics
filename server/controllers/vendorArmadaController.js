const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const VendorArmada = require('../models/vendorArmadaModel');

const getAllVendorArmada = async (req, res) => {
    try {
        const query = `
            SELECT * FROM vendor_armada
        `;
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results.length ? results : []);
    } catch (error) {
        console.error(error);
        res.status(500).send('Belum Ada Vendor');
    }
};

const getTersediaVendorArmada = async (req, res) => {
    try {
        const query = `
            SELECT * FROM vendor_armada WHERE status_vendor = "TERSEDIA"
        `;
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results.length ? results : []);
    } catch (error) {
        console.error(error);
        res.status(500).send('Belum Ada Vendor');
    }
};

const getTidakTersediaVendorArmada = async (req, res) => {
    try {
        const query = `
            SELECT * FROM vendor_armada WHERE status_vendor = "TIDAK TERSEDIA"
        `;
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results.length ? results : []);
    } catch (error) {
        console.error(error);
        res.status(500).send('Belum Ada Vendor');
    }
};

const getDetailVendorArmada = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
                JSON_OBJECT(
                    'id_vendor', vendor_armada.id_vendor,
                    'nama_vendor', vendor_armada.nama_vendor,
                    'alamat_vendor', vendor_armada.alamat_vendor,
                    'penanggungjawab_vendor', vendor_armada.penanggungjawab_vendor,
                    'telpon_vendor', vendor_armada.telpon_vendor,
                    'jumlah_armada', vendor_armada.jumlah_armada,
                    'status_vendor', vendor_armada.status_vendor,
                    'armada_by_id_vendor', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id_armada', armada.id_armada,
                                'id_vendor', armada.id_vendor,
                                'id_jenis_mobil', armada.id_jenis_mobil,
                                'nopol_mobil_armada', armada.nopol_mobil_armada,
                                'telpon_driver_armada', armada.telpon_driver_armada,
                                'status_armada', armada.status_armada,
                                'lokasi_terakhir', armada.lokasi_terakhir
                            )
                        )
                        FROM armada
                        JOIN vendor_armada ON armada.id_vendor = vendor_armada.id_vendor
                    )
                ) AS result
            FROM vendor_armada
            WHERE vendor_armada.id_vendor = :id
            LIMIT 1;
        `;
        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const addVendorArmada = async (req, res) => {
    const {
        nama_vendor,
        alamat_vendor,
        penanggungjawab_vendor,
        telpon_vendor,
        jumlah_armada,
        status_vendor
    } = req.body;

    try {
        const newVendorArmada = await VendorArmada.create({
            nama_vendor,
            alamat_vendor,
            penanggungjawab_vendor,
            telpon_vendor,
            jumlah_armada,
            status_vendor
        });
        res.status(200).send(newVendorArmada);
    } catch (error) {
        console.error(req.body);
        res.status(500).send(error);
    }
};

const updateVendorArmada = async (req, res) => {
    const { id } = req.params;
    const {
        nama_vendor,
        alamat_vendor,
        penanggungjawab_vendor,
        telpon_vendor
    } = req.body;
    const query = `
        UPDATE vendor_armada
        SET nama_vendor = :nama_vendor,
        alamat_vendor = :alamat_vendor,
        penanggungjawab_vendor = :penanggungjawab_vendor,
        telpon_vendor = :telpon_vendor
        WHERE id_vendor = :id
    `;
    const result = await sequelize.query(query, {
        replacements: { id, nama_vendor, alamat_vendor, penanggungjawab_vendor, telpon_vendor },
        type: sequelize.QueryTypes.UPDATE
    });
    if (result[0] === 0) {
        return res.status(404).json({ message: 'Gagal' });
    }
    res.status(200).json({ message: 'Berhasil' });
};

const updateStatusVendorArmada = async (req, res) => {
    const { id } = req.params;
    const {
        status_vendor
    } = req.body;
    const query = `
        UPDATE vendor_armada
        SET status_vendor = :status_vendor
        WHERE id_vendor = :id
    `;
    const result = await sequelize.query(query, {
        replacements: { id, status_vendor },
        type: sequelize.QueryTypes.UPDATE
    });
    if (result[0] === 0) {
        return res.status(404).json({ message: 'Gagal' });
    }
    res.status(200).json({ message: 'Berhasil' });
};

module.exports = {
    getAllVendorArmada,
    getTersediaVendorArmada,
    getTidakTersediaVendorArmada,
    addVendorArmada,
    getDetailVendorArmada,
    updateVendorArmada,
    updateStatusVendorArmada
};