const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const VendorArmada = require('./vendorArmadaModel');
const JenisMobil = require('./jenisMobilModel');

const armada = sequelize.define('armada', {
    id_armada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_vendor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: VendorArmada,
            key: 'id_vendor'
        }
    },
    id_jenis_mobil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: JenisMobil,
            key: 'id_jenis_mobil'
        }
    },
    nopol_mobil_armada: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status_armada: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lokasi_terakhir: {
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
    tableName: 'armada',
});

armada.belongsTo(VendorArmada, { foreignKey: 'id_vendor', as: 'id_vendor_armada' });
armada.belongsTo(JenisMobil, { foreignKey: 'id_jenis_mobil', as: 'fk_id_jenis_mobil' });

module.exports = armada;