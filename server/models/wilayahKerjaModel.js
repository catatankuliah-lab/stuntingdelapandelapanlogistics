const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Kabupaten = require("./kabupatenModel");
const KantorCabang = require("./kantorCabangModel");

const Wilayahkerja = sequelize.define(
  "wilayahkerja",
  {
    id_wilayahkerja: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kabupaten_kota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kabupaten,
        key: "id_kabupaten_kota",
      },
    },
    id_kantor_cabang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: KantorCabang,
        key: "id_kantor_cabang",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "wilayahkerja",
  }
);

Wilayahkerja.hasMany(Kabupaten, { foreignKey: 'id_kabupaten_kota', as: 'kabupaten_by_wilayah_kerja' })
Wilayahkerja.hasMany(KantorCabang, { foreignKey: 'id_kantor_cabang', as: 'kantor_cabang_by_wilayah_kerja' })

module.exports = Kecamatan;
