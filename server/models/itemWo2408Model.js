const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Desa = require('./desa2408Model');
const Wo = require('./wo2408Model');

const ItemWo2408 = sequelize.define('itemwo_2408', {
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
    tableName: 'itemwo_2408',
});

ItemWo2408.belongsTo(Desa, { foreignKey: 'id_desa_kelurahan', as: 'desa_kelurahan' });
ItemWo2408.belongsTo(Wo, { foreignKey: 'id_wo', as: 'wo_2408' });
Wo.hasMany(ItemWo2408, { foreignKey: 'id_wo', as: 'item_wo_by_wo_2408' });

module.exports = ItemWo2408;