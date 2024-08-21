const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const vendorArmada = sequelize.define('vendorArmada', {
    id_vendor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_vendor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_vendor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    penanggungjawab_vendor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telpon_vendor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jumlah_armada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status_vendor: {
        type: DataTypes.STRING,
        allowNull: true,
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
        beforeCreate: (vendorArmada) => {
            vendorArmada.nama_vendor = vendorArmada.nama_vendor.toUpperCase();
            vendorArmada.alamat_vendor = vendorArmada.alamat_vendor.toUpperCase();
            vendorArmada.penanggungjawab_vendor = vendorArmada.penanggungjawab_vendor.toUpperCase();
            vendorArmada.telpon_vendor = vendorArmada.telpon_vendor.toUpperCase();
        },
        beforeUpdate: (vendorArmada) => {
            vendorArmada.nama_vendor = vendorArmada.nama_vendor.toUpperCase();
            vendorArmada.alamat_vendor = vendorArmada.alamat_vendor.toUpperCase();
            vendorArmada.penanggungjawab_vendor = vendorArmada.penanggungjawab_vendor.toUpperCase();
            vendorArmada.telpon_vendor = vendorArmada.telpon_vendor.toUpperCase();
        },
    },
    tableName: 'vendor_armada',
});

module.exports = vendorArmada;
