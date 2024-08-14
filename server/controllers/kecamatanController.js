const Kecamatan = require("../models/kecamatanModel");
const Kabupaten = require("../models/kabupatenModel");
const Provinsi = require("../models/provinsiModel");
const Desa = require("../models/desa2408Model.js");
const { sequelize } = require('../config/database.js');

const getAllKecamatan = async (req, res) => {
  try {
    const kecamatans = await Kecamatan.findAll({
      include: [
        {
          model: Kabupaten,
          as: "kabupaten_kota",
          include: {
            model: Provinsi,
            as: "provinsi",
          },
        },
      ],
    });
    res.status(200).json(kecamatans);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getDetailKecamatan = async (req, res) => {
  const { id } = req.params;
  try {
    const kecamatan = await Kecamatan.findByPk(id, {
      include: [
        {
          model: Kabupaten,
          as: 'kabupaten_kota',
          include: [
            {
              model: Provinsi,
              as: 'provinsi'
            }
          ]
        }
      ]
    });

    if (!kecamatan) {
      return res.status(404).json({ message: 'Kecamatan not found' });
    }

    res.status(200).json(kecamatan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getDetailsKecamatan = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT * 
      FROM desa_kelurahan
      WHERE id_kecamatan = :id
      ORDER BY nama_desa_kelurahan ASC
    `;

    const results = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllKecamatan,
  getDetailKecamatan,
  getDetailsKecamatan
};
