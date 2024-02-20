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
      id_resursa: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "resurse",
          key: "id_resursa",
        },
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
    },
    {
      tableName: "sectiuni",
    }
  );
};
