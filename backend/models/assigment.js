module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "assigments",
    {
      id_assigment: {
        type: DataTypes.NUMBER,
        primarykey: true,
        allowNull: false,
        autoincrement: true,
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
      data_finalizare: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "assigments",
    }
  );
};
