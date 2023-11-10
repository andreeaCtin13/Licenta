module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "varianteDeRaspuns",
    {
      id_varianta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      text_varianta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      punctaj: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      id_intrebare: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "intrebari",
          key: "id_intrebare",
        },
      },
    },
    { tableName: "variante_de_raspuns" }
  );
};
