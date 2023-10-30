module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "varianteDeRaspuns",
    {
      id_varianta: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
      },
      text_varianta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      punctaj: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
      },
    },
    { tableName: "variante_de_raspuns" }
  );
};
