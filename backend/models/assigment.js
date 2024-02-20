module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "cerinte",
    {
      id_cerinta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      titlu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      cerinta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      id_sectiune: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "sectiuni",
          key: "id_sectiune",
          onDelete: "cascade",
        },
      },
    },
    {
      tableName: "cerinte",
    }
  );
};
