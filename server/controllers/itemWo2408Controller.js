const ItemWo = require('../models/itemWo2408Model');
const Wo = require('../models/wo2408Model');
const Desa = require('../models/desa2408Model');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');

const addItemWo = async (req, res) => {
    const {
        id_wo,
        id_desa_kelurahan,
        jumlah_paket_desa_kelurahan,
        jumlah_paket_desa_kelurahan_disalurkan
    } = req.body;

    try {
        const newItemWO = await ItemWo.create({
            id_wo,
            id_desa_kelurahan,
            jumlah_paket_desa_kelurahan,
            jumlah_paket_desa_kelurahan_disalurkan
        });
        res.status(200).send(newItemWO);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllItemWo = async (req, res) => {
    try {
        const itemwo = await ItemWo.findAll({
            include: [
                {
                    model: Wo,
                    as: 'wo',
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
        res.status(200).send(itemwo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const deleteItemWo = async (req, res) => {
    const { id } = req.params;
    try {
        const itemWO = await ItemWo.findByPk(id);
        if (!itemWO) {
            return res.status(404).send('Item not found');
        }
        await itemWO.destroy();
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    addItemWo,
    getAllItemWo,
    deleteItemWo
};
