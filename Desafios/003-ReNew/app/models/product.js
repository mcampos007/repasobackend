import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
  });
