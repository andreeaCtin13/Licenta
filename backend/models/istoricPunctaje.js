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
        allowNull: false,
        unique: false,
      },
      punctaj_obtinut: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false,
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
      tableName: "istoricuri_punctaje",
    }
  );
};
