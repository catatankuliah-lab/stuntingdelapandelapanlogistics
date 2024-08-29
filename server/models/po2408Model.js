const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const AdminKancab = require('./adminKancabModel');
const Alokasi = require('./alokasiModel');

const PO2408 = sequelize.define('PO2408', {
    id_po: {
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
    nama_customer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    muatan_ayam: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    muatan_telur: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    origin_po: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destinasi_po: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_po: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    tanggal_muat_po: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
        beforeCreate: (PO2408) => {
            PO2408.nama_customer = PO2408.nama_customer.toUpperCase();
            PO2408.origin_po = PO2408.origin_po.toUpperCase();
            PO2408.destinasi_po = PO2408.destinasi_po.toUpperCase();
        },
        beforeUpdate: (PO2408) => {
            PO2408.nama_customer = PO2408.nama_customer.toUpperCase();
            PO2408.origin_po = PO2408.origin_po.toUpperCase();
            PO2408.destinasi_po = PO2408.destinasi_po.toUpperCase();
        },
    },
    tableName: 'po_2408',
});

PO2408.belongsTo(Alokasi, { foreignKey: 'id_alokasi', as: 'alokasi' });
PO2408.belongsTo(AdminKancab, { foreignKey: 'id_admin_kancab', as: 'admin_kancab' });

module.exports = PO2408;
