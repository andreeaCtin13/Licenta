model.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "intrebari",
    {
      id_intrebare: {
        type: DataTypes.NUMBER,
        autoincrement: true,
      },
      text_intrebare: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "intrebari" }
  );
};
