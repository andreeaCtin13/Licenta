module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "resurse",
    {
      id_resursa: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
      },
      tip_resursa: {
        type: DataTypes.ENUM("video_link", "pdf_path"),
        defaultValue: "pdf_path",
        allowNull: false,
      },
      link_resourse: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      titlu_resursa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
    },
    {
      tableName: "resurse",
    }
  );
};
