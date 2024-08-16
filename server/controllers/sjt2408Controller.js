const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Sjt = require('../models/sjt2408Model');
const Lo = require('../models/lo2408Model');
const ItemWo = require('../models/itemWo2408Model');
const Wo = require('../models/wo2408Model');
const Desa = require('../models/desa2408Model');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');

const addSjt = async (req, res) => {
    const {
        id_lo,
        id_item_wo,
        nomor_sjt,
        tanggal_sjt,
        titik_bagi,
        waktu_bagi,
        qr_sjt
    } = req.body;
    
    try {
        const newSjt = await Sjt.create({
            id_lo,
            id_item_wo,
            nomor_sjt,
            tanggal_sjt,
            titik_bagi,
            waktu_bagi,
            qr_sjt
        });
        res.status(200).send(newSjt);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error' + error);
    }
};

const getAllSjt = async (req, res) => {
    try {
        const sjt = await Sjt.findAll({
            
        });
        res.status(200).send(sjt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error' + error);
    }
};

const getSJTbyLO = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
            lo.id_lo,
            lo.id_wo,
            lo.nomor_lo,
            lo.tanggal_lo,
            lo.status_lo,
            lo.nomor_mobil,
            lo.nama_driver,
            lo.nomor_driver,
            lo.nama_langsir,
            lo.alamat_langsir,
            lo.nama_pic,
            lo.qr_lo,
            lo.jenis_muatan,
            (
                SELECT COALESCE(
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id_sjt', i.id_sjt,
                            'id_lo', i.id_lo,
                            'id_item_wo', i.id_item_wo,
                            'nomor_sjt', i.nomor_sjt,
                            'tanggal_sjt', i.tanggal_sjt,
                            'titik_bagi', i.titik_bagi,
                            'waktu_bagi', i.waktu_bagi,
                            'qr_sjt', i.qr_sjt,
                            'desa_kelurahan', JSON_OBJECT(
                                'id_desa_kelurahan', iwosjt.id_desa_kelurahan,
                                'jumlah_paket_desa_kelurahan', iwosjt.jumlah_paket_desa_kelurahan,
                                'jumlah_paket_desa_kelurahan_disalurkan', iwosjt.jumlah_paket_desa_kelurahan_disalurkan,
                                'nama_desa_kelurahan', dksjt.nama_desa_kelurahan,
                                'nama_kecamatan', kec.nama_kecamatan,
                                'nama_kabupaten_kota', kab.nama_kabupaten_kota,
                                'jumlah_alokasi_desa', dksjt.jumlah_alokasi_desa
                            )
                        )
                    ),
                    JSON_ARRAY()
                )
                FROM sjt_2408 i
                LEFT JOIN lo_2408 losjt ON i.id_lo = losjt.id_lo
                LEFT JOIN itemwo_2408 iwosjt ON i.id_item_wo = iwosjt.id_item_wo
                LEFT JOIN desa_kelurahan_2408 dksjt ON iwosjt.id_desa_kelurahan = dksjt.id_desa_kelurahan
                LEFT JOIN kecamatan kec ON dksjt.id_kecamatan = kec.id_kecamatan
                LEFT JOIN kabupaten_kota kab ON kec.id_kabupaten_kota = kab.id_kabupaten_kota
                WHERE i.id_lo = lo.id_lo
            ) AS sjt_by_lo_2408
            FROM
                lo_2408 lo
            WHERE lo.id_lo = :id
            LIMIT 1
        `;

        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error', error);
    }
};

const deleteSJT = async (req, res) => {
    const { id } = req.params;
    try {
        const queryDelete = `DELETE FROM sjt_2408 WHERE id_sjt = :id`;
        await sequelize.query(queryDelete, {
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
    addSjt,
    getAllSjt,
    getSJTbyLO,
    deleteSJT
};
