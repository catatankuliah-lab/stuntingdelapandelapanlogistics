const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const WO = require('./wo2408Model');

const LO = sequelize.define('lo_2408', {
    id_lo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: WO,
            key: 'id_wo'
        }
    },
    nomor_lo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status_lo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomor_mobil: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_driver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomor_driver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_langsir: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_langsir: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_pic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_lo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jenis_muatan: {
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
    tableName: 'lo_2408',
    hooks: {
        beforeCreate: (lo_2408) => {
            lo_2408.nomor_lo = lo_2408.nomor_lo.toUpperCase();
            lo_2408.nomor_mobil = lo_2408.nomor_mobil.toUpperCase();
            lo_2408.nama_driver = lo_2408.nama_driver.toUpperCase();
            lo_2408.nomor_driver = lo_2408.nomor_driver.toUpperCase();
            lo_2408.nama_langsir = lo_2408.nama_langsir.toUpperCase();
            lo_2408.alamat_langsir = lo_2408.alamat_langsir.toUpperCase();
            lo_2408.nama_pic = lo_2408.nama_pic.toUpperCase();
        },
        beforeUpdate: (lo_2408) => {
            lo_2408.nomor_lo = lo_2408.nomor_lo.toUpperCase();
            lo_2408.nomor_mobil = lo_2408.nomor_mobil.toUpperCase();
            lo_2408.nama_driver = lo_2408.nama_driver.toUpperCase();
            lo_2408.nomor_driver = lo_2408.nomor_driver.toUpperCase();
            lo_2408.nama_langsir = lo_2408.nama_langsir.toUpperCase();
            lo_2408.alamat_langsir = lo_2408.alamat_langsir.toUpperCase();
            lo_2408.nama_pic = lo_2408.nama_pic.toUpperCase();
        }
    }
});

LO.belongsTo(WO, { foreignKey: 'id_wo', as: 'wo_2408' });

module.exports = LO;
