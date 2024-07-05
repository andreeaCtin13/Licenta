module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "cursuri",
    {
      id_curs: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      denumire: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 255],
        },
      },
      descriere: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 1000],
        },
      },
      nr_sectiuni: {
        type: DataTypes.INTEGER,
        validate: {
          max: 100,
        },
      },
      imagine_reprezentativa: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 100],
        },
      },
      id_utilizator: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "utilizatori",
          key: "id_utilizator",
          onDelete: "cascade",
        },
      },
    },
    {
      tableName: "cursuri",
    }
  );
};
