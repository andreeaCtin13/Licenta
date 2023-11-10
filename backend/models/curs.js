module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "cursuri",
    {
      id_curs: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      denumire: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 30],
        },
      },
      descriere: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 30],
        },
      },
      nr_sectiuni: {
        type: DataTypes.INTEGER,
        validate: {
          defaultValue: 0,
          min: 0,
          max: 100,
        },
        imagine_reprezentativa: {
          type: DataTypes.STRING,
          validate: {
            len: [3, 100],
          },
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
      },
    },
    {
      tableName: "cursuri",
    }
  );
  //   retur.query(`
  //   CREATE TRIGGER count_sections
  //   BEFORE INSERT ON sectiuni
  //   FOR EACH ROW
  //   BEGIN
  //     update cursuri set nrSectiuni = COUNT( select * form sectiuni where idCurs=idCurs)
  //     FROM
  //     WHERE condition;;
  //   END;
  // `);
};
