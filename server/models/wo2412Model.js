const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Gudang = require('./gudangModel');
const AdminKancab = require('./adminKancabModel');
const Alokasi = require('./alokasiModel');

const WO2412 = sequelize.define('WO2412', {
    id_wo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_gudang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gudang,
            key: 'id_gudang'
        }
    },
    id_admin_kancab: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AdminKancab,
            key: 'id_admin_kancab'
        }
    },
    id_alokasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Alokasi,
            key: 'id_alokasi'
        }
    },
    nomor_wo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_wo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status_wo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_wo: {
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
    tableName: 'wo_2412',
});

WO2412.belongsTo(Alokasi, { foreignKey: 'id_alokasi', as: 'alokasi' });
WO2412.belongsTo(Gudang, { foreignKey: 'id_gudang', as: 'gudang' });
WO2412.belongsTo(AdminKancab, { foreignKey: 'id_admin_kancab', as: 'admin_kancab' });

module.exports = WO2412;
