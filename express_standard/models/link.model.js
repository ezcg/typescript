import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Link = sequelize.define(
  'Link',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    linkName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: 'links',
    timestamps: false
  }
);

export default Link;
