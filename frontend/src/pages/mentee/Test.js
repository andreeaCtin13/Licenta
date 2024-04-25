import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import style from "../../styles/mentee/Test.module.css";
import axios from "axios";
function Test() {
  const { idSectiune } = useParams();
  const [idTest, setIdTest] = useState();
  const [intrebari, setIntrebari] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);
  const [sectiune, setSectiune] = useState();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const getSectiuneById = async () => {
    await axios
      .get(`http://localhost:8080/sectiuni/getSectiuneById/${idSectiune}`)
      .then((rez) => {
        setSectiune({ ...rez.data.sectiune });
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`http://localhost:8080/teste/getTestByIdSection/${idSectiune}`)
      .then(async (rez) => {
        setIdTest(rez.data.test[0].id_test);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(selectedOptions);

  const handleOptionChange = (qIndex, optIndex, optScor) => {
    const updatedIntrebari = [...intrebari];
    updatedIntrebari[qIndex].varianteDeRaspuns[optIndex].selected =
      !updatedIntrebari[qIndex].varianteDeRaspuns[optIndex].selected;
    setIntrebari(updatedIntrebari);
  };

  console.log("updatedIntrebari", intrebari);

  const setGrade = () => {
    let grade = 0;
    intrebari.forEach((intrebare) => {
      intrebare.varianteDeRaspuns.forEach((optiune) => {
        if (optiune.selected && optiune.este_corecta) {
          grade +=
            intrebare.punctaj_intrebare /
            intrebare.varianteDeRaspuns.filter((x) => x.este_corecta).length;
        } else if (optiune.selected && !optiune.este_corecta) {
          grade -=
            intrebare.punctaj_intrebare /
            intrebare.varianteDeRaspuns.filter((x) => x.este_corecta).length;
        }
      });
    });

    if (grade < 0) {
      grade = 0;
    }

    console.log("GRADE", grade);
    setTotalGrade(grade);
  };

  const setTestFunction = async () => {
    await axios(
      `http://localhost:8080/intrebare/getAllIntrebariByTestId/${idTest}`
    )
      .then((rez) => {
        setIntrebari(rez.data.intrebari);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSectiuneById();
  }, []);

  useEffect(() => {
    setTestFunction();
  }, [idTest]);

  return (
    <div className={style.testContainer}>
      <h1>{sectiune ? sectiune.denumire : ""}</h1>
      <div className={style.container}>
        {intrebari.map((intrebare, qIndex) => (
          <div key={qIndex} className={style.questionContainer}>
            <div>{intrebare.text_intrebare}</div>
            <ul className={style.unlist}>
              {intrebare.varianteDeRaspuns.map((optiune, optIndex) => (
                <li className={style.li} key={optIndex}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleOptionChange(
                        qIndex,
                        optIndex,
                        optiune.este_corecta
                          ? intrebare.punctaj_intrebare /
                              intrebare.varianteDeRaspuns.filter(
                                (x) => x.este_corecta
                              ).length
                          : 0
                      )
                    }
                  />
                  <div>{optiune.text_varianta}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* <Link to={`/course/${idSectiune}`}> */}
        <button className={style.submitBtn} onClick={setGrade}>
          Submit
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Test;
