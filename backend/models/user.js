module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "utilizatori",
    {
      id_utilizator: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [3, 40],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["mentor", "junior", "admin"],
        defaultValue: "junior",
        allowNull: false,
      },
    },
    { tableName: "utilizatori" }
  );
};
