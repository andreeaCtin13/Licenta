module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "sectiuni",
    {
      id_sectiune: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
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
      id_curs: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "cursuri",
          key: "id_curs",
        },
      },
    },
    {
      tableName: "sectiuni",
    }
  );
};
