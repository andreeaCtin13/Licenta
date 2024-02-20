module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "resurse",
    {
      id_resursa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      tip_resursa: {
        type: DataTypes.ENUM("video_link", "pdf_path"),
        defaultValue: "pdf_path",
        allowNull: false,
      },
      link_resursa: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 255],
        },
      },
      titlu_resursa: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 50],
        },
      },
      id_sectiune: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: "sectiuni",
          key: "id_sectiune",
          onDelete: "cascade",
        },
      },
    },
    {
      tableName: "resurse",
    }
  );
};
