module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "istoric_cerinte",
    {
      id_cerinta_istoric: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      data_finalizare: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rezolvare: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 255],
        },
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 855],
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
      id_cerinta: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "cerinte",
          key: "id_cerinta",
          onDelete: "cascade",
        },
      },
    },
    {
      tableName: "istoric_cerinte",
    }
  );
};
