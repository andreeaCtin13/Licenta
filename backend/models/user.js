module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      id_user: {
        type: DataTypes.STRING,
        autoincrement: true,
        allowNull: false,
        primaryKey: true,
      },
      mail: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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
        type: DataTypes.ENUM("admin", "mentee", "mentor"),
        defaultValue: "mentee",
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        //TO DO: SA PERMITI IN FRONTEND SA NU SE ADAUGE POZA NEAPARAT LA CANDIDAT + POZA DEFAULT CU USER IN CAZ DE NU SE PUNE POZA INITIAL
        allowNull: true,
      },
    },
    { tableName: "users" }
  );
};
