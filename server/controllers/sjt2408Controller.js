const Sjt = require('../models/sjt2408Model');
const Lo = require('../models/lo2408Model');
const ItemWo = require('../models/itemWo2408Model');
const Wo = require('../models/wo2408Model');
const Desa = require('../models/desa2408Model');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');

const addSjt = async (req, res) => {
    const {
        id_desa_kelurahan,
        id_lo,
        nomor_sjt,
        tanggal_sjt,
        status_sjt,
        jmlah_paket_sjt,
        jam_penerimaan,
        qr_sjt
    } = req.body;

    try {
        const newSjt = await Sjt.create({
            id_desa_kelurahan,
            id_lo,
            nomor_sjt,
            tanggal_sjt,
            status_sjt,
            jmlah_paket_sjt,
            jam_penerimaan,
            qr_sjt
        });
        res.status(200).send(newSjt);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllSjt = async (req, res) => {
    try {
        const sjt = await Sjt.findAll({
            include: [
                {
                    model: Lo,
                    as: 'lo',
                    include: {
                        model: ItemWo,
                        as: 'item_wo',
                        include: {
                            model: Wo,
                            as: 'wo',
                        },
                    },
                },
                {
                    model: Desa,
                    as: 'desa_kelurahan',
                    include: {
                        model: Kecamatan,
                        as: 'kecamatan',
                        include: {
                            model: Kabupaten,
                            as: 'kabupaten_kota',
                        },
                    },
                }]
        });
        res.status(200).send(sjt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addSjt,
    getAllSjt,
};
