module.exports = (sequelize, DataTypes) => {
  return sequelize.define("sectiuni", {
    id_sectiune: {
      type: DataTypes.NUMBER,
      primarykey: true,
      allowNull: false,
      autoincrement: true,
    },
    denumire: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    descriere: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
  });
};
