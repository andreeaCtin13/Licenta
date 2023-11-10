module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "teste",
    {
      id_test: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      punctaj_minim_promovare: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      id_sectiune: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "sectiuni",
          key: "id_sectiune",
        },
      },
    },
    {
      tableName: "teste",
    }
  );
};
