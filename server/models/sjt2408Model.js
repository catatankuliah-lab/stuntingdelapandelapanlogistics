const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Lo = require('./lo2408Model');
const Desa = require('./desa2408Model');

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
    id_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Desa,
            key: 'id_desa_kelurahan'
        }
    },
    nomor_sjt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_sjt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    titik_bagi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jam_penerimaan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_sjt: {
        type: DataTypes.DATE,
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
    timestamps: false,
    tableName: 'sjt_2408',
});

SJT2408.belongsTo(Desa, { foreignKey: 'id_desa_kelurahan', as: 'desa_kelurahan' });
SJT2408.belongsTo(Lo, { foreignKey: 'id_lo', as: 'lo' });

module.exports = SJT2408;
