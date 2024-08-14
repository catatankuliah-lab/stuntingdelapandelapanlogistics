const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Gudang = require('./gudangModel');
const AdminKancab = require('./adminKancabModel');
const Alokasi = require('./alokasiModel');

const WO2408 = sequelize.define('WO2408', {
    id_wo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    hooks: {
        beforeCreate: (WO2408) => {
            WO2408.nomor_wo = WO2408.nomor_wo.toUpperCase();
        },
        beforeUpdate: (WO2408) => {
            WO2408.nomor_wo = WO2408.nomor_wo.toUpperCase();
        },
    },
    tableName: 'wo_2408',
});

WO2408.belongsTo(Alokasi, { foreignKey: 'id_alokasi', as: 'alokasi' });
WO2408.belongsTo(AdminKancab, { foreignKey: 'id_admin_kancab', as: 'admin_kancab' });

module.exports = WO2408;
