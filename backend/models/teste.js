module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "teste",
    {
      id_test: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoincrement: true,
      },
      punctaj_minim_promovare: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
    },
    {
      tableName: "teste",
    }
  );
};
