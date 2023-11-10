module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "istoricuriPunctaje",
    {
      id_istoric: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data_sustinere: {
        type: DataTypes.DATE,
      },
      id_user: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "users",
          key: "id_user",
        },
      },
      id_test: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "teste",
          key: "id_test",
        },
      },
    },
    {
      tableName: "istoricuri_punctaje",
    }
  );
};
