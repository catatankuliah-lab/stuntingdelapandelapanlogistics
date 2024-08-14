const { sequelize } = require('../config/database.js');

const getAllDesaByIdKecamatan = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT * 
      FROM desa_kelurahan_2408
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

const getAllDesaByIdKecamatanBelumDibuatWO = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT * 
      FROM desa_kelurahan_2408
      WHERE id_kecamatan = :id
      AND jumlah_alokasi_desa_sisa != 0
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

const updateJumlahAlokasiDesaSisa = async (req, res) => {
  const { id } = req.params;
  const { jumlah_alokasi_desa_sisa } = req.body;

  try {
    if (typeof jumlah_alokasi_desa_sisa !== 'number' || jumlah_alokasi_desa_sisa < 0) {
      return res.status(400).json({ message: 'Invalid jumlah_alokasi_desa_sisa value' });
    }

    const query = `
      UPDATE desa_kelurahan_2408
      SET jumlah_alokasi_desa_sisa = :jumlah_alokasi_desa_sisa
      WHERE id_desa_kelurahan = :id
    `;

    const result = await sequelize.query(query, {
      replacements: { id, jumlah_alokasi_desa_sisa },
      type: sequelize.QueryTypes.UPDATE
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: 'Desa/Kelurahan not found' });
    }

    res.status(200).json({ message: 'Jumlah alokasi desa sisa updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllDesaByIdKecamatan,
  getAllDesaByIdKecamatanBelumDibuatWO,
  updateJumlahAlokasiDesaSisa
};
