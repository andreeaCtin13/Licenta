module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "istoricuriPunctaje",
    {
      //   id_test: {
      //     type: DataTypes.NUMBER,
      //   },
      //   id_user: {},
    },
    {
      tableName: "istoricuri_punctaje",
    }
  );
};
