module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "cereriCursuri",
    {
      id_cerere: {
        type: DataTypes.NUMBER,
        primarykey: true,
        allowNull: true,
        autoincrement: true,
      },
    },
    {
      tableName: "cereri_cursuri",
    }
  );
};
