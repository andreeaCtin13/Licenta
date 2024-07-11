import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../../styles/mentee/Test.module.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";

function Test() {
  const { user } = useContext(UserContext);
  const { idSectiune, idCourse } = useParams();
  const [idTest, setIdTest] = useState();
  const [intrebari, setIntrebari] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);
  const [sectiune, setSectiune] = useState();
  const toast = useRef(null);

  console.log("INTREBARI", intrebari)

  useEffect(() => {
    const getSectiuneById = async () => {
      try {
        const sectiuneRes = await axios.get(
          `http://localhost:8080/sectiuni/getSectiuneById/${idSectiune}`
        );
        setSectiune({ ...sectiuneRes.data.sectiune });

        const testRes = await axios.get(
          `http://localhost:8080/teste/getTestByIdSection/${idSectiune}`
        );
        setIdTest(testRes.data.test[0].id_test);
      } catch (err) {
        console.log(err);
      }
    };
    getSectiuneById();
  }, [idSectiune]);

  useEffect(() => {
    const setTestFunction = async () => {
      try {
        const intrebariRes = await axios.get(
          `http://localhost:8080/intrebare/getAllIntrebariByTestId/${idTest}`
        );
        setIntrebari(intrebariRes.data.intrebari);
        console.log("SUNT AICI")
      } catch (err) {
        console.log(err);
      }
    };
    if (idTest) setTestFunction();
  }, [idTest]);

  const handleOptionChange = (qIndex, optIndex) => {
    const updatedIntrebari = [...intrebari];
    updatedIntrebari[qIndex].varianteDeRaspuns[optIndex].selected =
      !updatedIntrebari[qIndex].varianteDeRaspuns[optIndex].selected;
    setIntrebari(updatedIntrebari);
  };

  const sendGradeInBackend = async (grade) => {
    try {
      await axios.post(`http://localhost:8080/istoricuriPunctaje/insert`, {
        id_test: idTest,
        id_utilizator: user.id_utilizator,
        grade,
      });
      toast.current.show({
        severity: "success",
        summary: "Succesful",
        detail: "S-a înregistrat raspunsul tău!",
        life: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

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

    if (grade < 0) grade = 0;
    setTotalGrade(grade);
    sendGradeInBackend(grade);
  };

  return (
    <div className={style.testContainer}>
      <Toast ref={toast} />
      <h1>{sectiune ? sectiune.denumire : ""}</h1>
      <div className={style.container}>
        {intrebari.map((intrebare, qIndex) => (
          <div key={qIndex} className={style.questionContainer}>
            <div>
              {qIndex + 1}.{") "}
              {intrebare.text_intrebare}
            </div>
            <ul className={style.unlist}>
              {intrebare.varianteDeRaspuns.map((optiune, optIndex) => (
                <li className={style.li} key={optIndex}>
                  <input
                    type="checkbox"
                    onChange={() => handleOptionChange(qIndex, optIndex)}
                  />
                  <div>{optiune.text_varianta}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link to={`/course/${idCourse}`}>
          <button className={style.submitBtn} onClick={setGrade}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Test;
