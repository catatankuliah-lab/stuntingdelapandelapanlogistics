const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Lo = require('./lo2408Model');
const ItemWO = require('./itemWo2408Model');

const SJT2408 = sequelize.define('sjt_2408', {
    id_sjt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_lo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lo,
            key: 'id_lo'
        }
    },
    id_item_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ItemWO,
            key: 'id_item_wo'
        }
    },
    nomor_sjt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_sjt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    titik_bagi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    waktu_bagi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_sjt: {
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
            WO2408.titik_bagi = WO2408.titik_bagi.toUpperCase();
            WO2408.waktu_bagi = WO2408.waktu_bagi.toUpperCase();
        },
        beforeUpdate: (WO2408) => {
            WO2408.titik_bagi = WO2408.titik_bagi.toUpperCase();
            WO2408.waktu_bagi = WO2408.waktu_bagi.toUpperCase();
        },
    },
    tableName: 'sjt_2408',
});

SJT2408.belongsTo(ItemWO, { foreignKey: 'id_item_wo', as: 'id_item_wo_sjt' });
SJT2408.belongsTo(Lo, { foreignKey: 'id_lo', as: 'lo' });

module.exports = SJT2408;
