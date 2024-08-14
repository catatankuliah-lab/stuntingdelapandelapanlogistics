const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Desa = require('./desa2409Model');
const Wo = require('./wo2409Model');

const ItemWo2409 = sequelize.define('itemwo_2409', {
    id_item_wo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Wo,
            key: 'id_wo'
        }
    },
    id_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Desa,
            key: 'id_desa_kelurahan'
        }
    },
    jumlah_paket_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    jumlah_paket_desa_kelurahan_disalurkan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    timestamps: false,
    tableName: 'itemwo_2409',
});

ItemWo2409.belongsTo(Desa, { foreignKey: 'id_desa_kelurahan', as: 'desa_kelurahan' });
ItemWo2409.belongsTo(Wo, { foreignKey: 'id_wo', as: 'wo' });
Wo.hasMany(ItemWo2409, { foreignKey: 'id_wo', as: 'item_wo_by_wo_2409' });

module.exports = ItemWo2409;