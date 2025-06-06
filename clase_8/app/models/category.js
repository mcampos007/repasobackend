// models/category.js
import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


