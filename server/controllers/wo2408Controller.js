const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const AdminKancab = require('../models/adminKancabModel');
const WO2408 = require('../models/wo2408Model');
const KantorCabang = require('../models/kantorCabangModel');
const User = require('../models/userModel');
const HakAkses = require('../models/hakAksesModel');
const Alokasi = require('../models/alokasiModel');
const addWo = async (req, res) => {
    const {
        id_admin_kancab,
        id_alokasi,
        nomor_wo,
        nama_supplier_wo,
        alamat_supplier_wo,
        nomor_supplier_wo,
        tanggal_wo,
        status_wo,
        qr_wo
    } = req.body;

    try {
        const newWo = await WO2408.create({
            id_admin_kancab,
            id_alokasi,
            nomor_wo,
            nama_supplier_wo,
            alamat_supplier_wo,
            nomor_supplier_wo,
            tanggal_wo,
            status_wo,
            qr_wo
        });
        res.status(200).send(newWo);
    } catch (error) {
        console.error(req.body);
        res.status(500).send(error);
    }
};

const updateWO = async (req, res) => {
    const { id } = req.params;
    const {
        nomor_wo,
        tanggal_wo,
        nama_supplier_wo,
        alamat_supplier_wo,
        nomor_supplier_wo,
        qr_wo
    } = req.body;
    try {
        const [updated] = await WO2408.update({
            nomor_wo,
            tanggal_wo,
            nama_supplier_wo,
            alamat_supplier_wo,
            nomor_supplier_wo,
            qr_wo
        }, {
            where: { id_wo: id }
        });

        if (updated) {
            const updatedWo = await WO2408.findByPk(id, {
                include: [
                    {
                        model: AdminKancab,
                        as: 'admin_kancab',
                        include: {
                            model: User,
                            as: 'user',
                            include: {
                                model: HakAkses,
                                as: "hak_akses",
                            },
                        },
                    },
                    {
                        model: Alokasi,
                        as: 'alokasi',
                    }]
            });
            return res.status(200).json(updatedWo);
        }
        res.status(404).json({ message: 'WO not found' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getAllWo = async (req, res) => {
    try {
        const wo = await WO2408.findAll({
            include: [
                {
                    model: AdminKancab,
                    as: 'admin_kancab',
                    include: {
                        model: User,
                        as: 'user',
                        include: {
                            model: HakAkses,
                            as: "hak_akses",
                        },
                    },
                },
                {
                    model: Alokasi,
                    as: 'alokasi',
                }]
        });
        res.status(200).send(wo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


const getDetailsWO = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
            wo.id_wo,
            wo.id_admin_kancab,
            wo.id_alokasi,
            wo.nomor_wo,
            wo.nama_supplier_wo,
            wo.alamat_supplier_wo,
            wo.nomor_supplier_wo,
            wo.tanggal_wo,
            wo.status_wo,
            wo.qr_wo,
            wo.createdAt,
            wo.updatedAt,
            (
                SELECT
                    JSON_OBJECT(
                        'id_alokasi', a.id_alokasi,
                        'bulan_alokasi', a.bulan_alokasi,
                        'tahun_alokasi', a.tahun_alokasi,
                        'createdAt', a.createdAt,
                        'updatedAt', a.updatedAt
                    )
                FROM alokasi a
                WHERE a.id_alokasi = wo.id_alokasi
            ) AS alokasi,
            (
                SELECT COALESCE(
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id_item_wo', i.id_item_wo,
                            'id_wo', i.id_wo,
                            'id_desa_kelurahan', i.id_desa_kelurahan,
                            'jumlah_paket_desa_kelurahan', i.jumlah_paket_desa_kelurahan,
                            'jumlah_paket_desa_kelurahan_disalurkan', i.jumlah_paket_desa_kelurahan_disalurkan,
                            'createdAt', i.createdAt,
                            'updatedAt', i.updatedAt,
                            'desa_kelurahan', JSON_OBJECT(
                                'id_desa_kelurahan', d.id_desa_kelurahan,
                                'id_kecamatan', d.id_kecamatan,
                                'kode_desa_kelurahan', d.kode_desa_kelurahan,
                                'nama_desa_kelurahan', d.nama_desa_kelurahan,
                                'jumlah_alokasi_desa', d.jumlah_alokasi_desa,
                                'jumlah_alokasi_desa_sisa', d.jumlah_alokasi_desa_sisa,
                                'createdAt', d.createdAt,
                                'updatedAt', d.updatedAt,
                                'kecamatan', JSON_OBJECT(
                                    'id_kecamatan', k.id_kecamatan,
                                    'id_kabupaten_kota', k.id_kabupaten_kota,
                                    'kode_kecamatan', k.kode_kecamatan,
                                    'nama_kecamatan', k.nama_kecamatan,
                                    'createdAt', k.createdAt,
                                    'updatedAt', k.updatedAt,
                                    'kabupaten_kota', JSON_OBJECT(
                                        'id_kabupaten_kota', kc.id_kabupaten_kota,
                                        'kode_kabupaten_kota', kc.kode_kabupaten_kota,
                                        'nama_kabupaten_kota', kc.nama_kabupaten_kota,
                                        'id_provinsi', kc.id_provinsi,
                                        'createdAt', kc.createdAt,
                                        'updatedAt', kc.updatedAt,
                                        'provinsi', JSON_OBJECT(
                                            'id_provinsi', p.id_provinsi,
                                            'kode_provinsi', p.kode_provinsi,
                                            'nama_provinsi', p.nama_provinsi,
                                            'createdAt', p.createdAt,
                                            'updatedAt', p.updatedAt
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    JSON_ARRAY()
                )
                FROM itemwo_2408 i
                LEFT JOIN desa_kelurahan_2408 d ON i.id_desa_kelurahan = d.id_desa_kelurahan
                LEFT JOIN kecamatan k ON d.id_kecamatan = k.id_kecamatan
                LEFT JOIN kabupaten_kota kc ON k.id_kabupaten_kota = kc.id_kabupaten_kota
                LEFT JOIN provinsi p ON kc.id_provinsi = p.id_provinsi
                WHERE i.id_wo = wo.id_wo
            ) AS item_wo_by_wo_2408,
            (
                SELECT COALESCE(SUM(i.jumlah_paket_desa_kelurahan), 0)
                FROM itemwo_2408 i
                WHERE i.id_wo = wo.id_wo
            ) AS totalPaketDesaKelurahan,
            (
                SELECT COALESCE(SUM(i.jumlah_paket_desa_kelurahan_disalurkan), 0)
                FROM itemwo_2408 i
                WHERE i.id_wo = wo.id_wo
            ) AS totalPaketDesaKelurahanDisalurkan,
            (
                SELECT COALESCE(SUM(i.jumlah_paket_desa_kelurahan - i.jumlah_paket_desa_kelurahan_disalurkan), 0)
                FROM itemwo_2408 i
                WHERE i.id_wo = wo.id_wo
            ) AS totalPaketDesaKelurahanSisa
            FROM
                wo_2408 wo
            WHERE wo.id_wo = :id
            LIMIT 1
        `;

        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};



const deleteWO = async (req, res) => {
    const { id } = req.params;
    try {
        const query1 = `SELECT * FROM itemwo_2408 WHERE id_wo = :id`;
        const itemwoResults = await sequelize.query(query1, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        if (itemwoResults.length === 0) {
            const query2 = `DELETE FROM wo_2408 WHERE id_wo = :id`;
            await sequelize.query(query2, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).send('Item deleted successfully 1');
        } else {
            const updateQueries = itemwoResults.map(item => {
                return {
                    query: `
                UPDATE desa_kelurahan_2408
                SET jumlah_alokasi_desa_sisa = :jumlah_paket_desa_kelurahan
                WHERE id_desa_kelurahan = :id_desa_kelurahan
                `,
                    replacements: {
                        jumlah_paket_desa_kelurahan: item.jumlah_paket_desa_kelurahan,
                        id_desa_kelurahan: item.id_desa_kelurahan
                    }
                };
            });
            await Promise.all(updateQueries.map(query =>
                sequelize.query(query.query, {
                    replacements: query.replacements,
                    type: sequelize.QueryTypes.UPDATE
                })
            ));
            const query = `DELETE FROM itemwo_2408 WHERE id_wo = :id`;
            await sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });
            const query2 = `DELETE FROM wo_2408 WHERE id_wo = :id`;
            await sequelize.query(query2, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).send('Item deleted successfully 2');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Hapus WO Gagal : ' + error);
    }
};

module.exports = {
    addWo,
    updateWO,
    getAllWo,
    getDetailsWO,
    deleteWO
};