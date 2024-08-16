const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Lo = require('../models/lo2408Model');
const ItemWo = require('../models/itemWo2408Model');
const Gudang = require('../models/gudangModel');
const Wo = require('../models/wo2408Model');

const addLo = async (req, res) => {
    const {
        id_wo,
        nomor_lo,
        tanggal_lo,
        status_lo,
        nomor_mobil,
        nama_driver,
        nomor_driver,
        nama_langsir,
        alamat_langsir,
        nama_pic,
        qr_lo,
        jenis_muatan,
    } = req.body;

    try {
        const newLo = await Lo.create({
            id_wo,
            nomor_lo,
            tanggal_lo,
            status_lo,
            nomor_mobil,
            nama_driver,
            nomor_driver,
            nama_langsir,
            alamat_langsir,
            nama_pic,
            qr_lo,
            jenis_muatan
        });
        res.status(200).send(newLo);
    } catch (error) {
        console.error(req.body);
        res.status(500).send(error);
    }
};

const getDetailLO = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
                JSON_OBJECT(
                    'id_lo', lo_2408.id_lo,
                    'nomor_mobil', lo_2408.nomor_mobil,
                    'nama_driver', lo_2408.nama_driver,
                    'nomor_driver', lo_2408.nomor_driver,
                    'nomor_lo', lo_2408.nomor_lo,
                    'nama_langsir', lo_2408.nama_langsir,
                    'alamat_langsir', lo_2408.alamat_langsir,
                    'nama_pic', lo_2408.nama_pic,
                    'tanggal_lo', lo_2408.tanggal_lo,
                    'wo_details', JSON_OBJECT(
                        'id_wo', wo_2408.id_wo,
                        'nomor_wo', wo_2408.nomor_wo,
                        'items', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id_item_wo', itemwo_2408.id_item_wo,
                                    'id_desa_kelurahan', itemwo_2408.id_desa_kelurahan,
                                    'nama_desa_kelurahan', desa_kelurahan_2408.nama_desa_kelurahan,
                                    'nama_kecamatan', kecamatan.nama_kecamatan,
                                    'nama_kabupaten_kota', kabupaten_kota.nama_kabupaten_kota,
                                    'jumlah_paket_desa_kelurahan', itemwo_2408.jumlah_paket_desa_kelurahan
                                )
                            )
                            FROM itemwo_2408
                            JOIN desa_kelurahan_2408 ON itemwo_2408.id_desa_kelurahan = desa_kelurahan_2408.id_desa_kelurahan
                            JOIN kecamatan ON desa_kelurahan_2408.id_kecamatan = kecamatan.id_kecamatan
                            JOIN kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
                            WHERE itemwo_2408.id_wo = wo_2408.id_wo
                            AND itemwo_2408.jumlah_paket_desa_kelurahan != 0
                        )
                    )
                ) AS result
            FROM lo_2408
            JOIN wo_2408 ON lo_2408.id_wo = wo_2408.id_wo
            WHERE lo_2408.id_lo = :id
            LIMIT 1;
        `;
        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

const getAllLObyIDAdminKancabAyam = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT lo_2408.*
            FROM lo_2408
            JOIN wo_2408
            ON lo_2408.id_wo = wo_2408.id_wo
            WHERE wo_2408.id_admin_kancab = :id
            AND lo_2408.jenis_muatan = "AYAM"
            ORDER BY lo_2408.id_lo DESC
        `;
        const results = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

const getLastIDLObyIDAdminKancabAyam = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT lo_2408.id_lo
            FROM lo_2408
            JOIN wo_2408
            ON lo_2408.id_wo = wo_2408.id_wo
            WHERE lo_2408.jenis_muatan = "AYAM"
            AND wo_2408.id_admin_kancab = :id
            ORDER BY lo_2408.id_lo DESC
            LIMIT 1
        `;
        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

const getAllLObyIDAdminKancabTelur = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT lo_2408.*
            FROM lo_2408
            JOIN wo_2408
            ON lo_2408.id_wo = wo_2408.id_wo
            WHERE wo_2408.id_admin_kancab = :id
            AND lo_2408.jenis_muatan = "TELUR"
            ORDER BY lo_2408.id_lo DESC
        `;
        const results = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

const getLastIDLObyIDAdminKancabTelur = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT lo_2408.id_lo
            FROM lo_2408
            JOIN wo_2408
            ON lo_2408.id_wo = wo_2408.id_wo
            WHERE wo_2408.id_admin_kancab = :id
            AND lo_2408.jenis_muatan = "TELUR"
            ORDER BY lo_2408.id_lo DESC
            LIMIT 1
        `;
        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

module.exports = {
    addLo,
    getDetailLO,
    getLastIDLObyIDAdminKancabAyam,
    getAllLObyIDAdminKancabAyam,
    getLastIDLObyIDAdminKancabTelur,
    getAllLObyIDAdminKancabTelur
};
