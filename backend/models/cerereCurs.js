module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "cereriCursuri",
    {
      id_cerere: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
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
      tableName: "cereri_cursuri",
    }
  );
};
