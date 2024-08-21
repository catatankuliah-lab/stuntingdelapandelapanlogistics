const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const jenisMobil = sequelize.define('jenisMobil', {
    id_jenis_mobil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_jenis_mobil: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (jenisMobil) => {
            jenisMobil.nama_jenis_mobil = jenisMobil.nama_jenis_mobil.toUpperCase();
            jenisMobil.keterangan = jenisMobil.keterangan.toUpperCase();
        },
        beforeUpdate: (jenisMobil) => {
            jenisMobil.nama_jenis_mobil = jenisMobil.nama_jenis_mobil.toUpperCase();
            jenisMobil.keterangan = jenisMobil.keterangan.toUpperCase();
        },
    },
    tableName: 'jenis_mobil',
});

module.exports = jenisMobil;
