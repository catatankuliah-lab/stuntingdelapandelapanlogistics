const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Kecamatan = require("./kecamatanModel");

const Desa2409 = sequelize.define(
  "desa_kelurahan_2409",
  {
    id_desa_kelurahan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kecamatan,
        key: "id_kecamatan",
      },
    },
    kode_desa_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_desa_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_alokasi_desa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    jumlah_alokasi_desa_sisa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "desa_kelurahan_2409"
  }
);

Desa2409.belongsTo(Kecamatan, { foreignKey: 'id_kecamatan', as: 'kecamatan' });
Kecamatan.hasMany(Desa2409, { foreignKey: 'id_kecamatan', as: 'desa_kelurahan_2409_by_kecamatan' });

module.exports = Desa2409;
