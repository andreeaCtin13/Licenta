module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "intrebari",
    {
      id_intrebare: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text_intrebare: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      id_test: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "teste",
          key: "id_test",
          onDelete: "cascade",
        },
      },
      punctaj_intrebare: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false,
      },
    },
    { tableName: "intrebari" }
  );
};
