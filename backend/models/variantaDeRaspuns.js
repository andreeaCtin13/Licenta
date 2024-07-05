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
          len: [2, 655],
        },
      },
      este_corecta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      id_intrebare: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "intrebari",
          key: "id_intrebare",
          onDelete: "cascade",
        },
      },
    },
    { tableName: "variante_de_raspuns" }
  );
};
