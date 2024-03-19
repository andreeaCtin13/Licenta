module.exports = (sequelize, DataTypes) => {
  const CereriCurs = sequelize.define(
    "cereriCursuri",
    {
      id_cerere: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
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
      id_curs: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "cursuri",
          key: "id_curs",
          onDelete: "cascade",
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "accepted", "declined"],
        defaultValue: "pending",
        allowNull: false,
      },
    },
    {
      tableName: "cereri_cursuri",
    }
  );

  return CereriCurs;
};
