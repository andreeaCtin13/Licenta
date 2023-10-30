module.exports = (sequelize, DataTypes) => {
  let retur = sequelize.define(
    "cursuri",
    {
      id_curs: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
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
        type: DataTypes.NUMBER,
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
  return retur;
};
