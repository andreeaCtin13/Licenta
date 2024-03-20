import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import style from "../../styles/mentee/Test.module.css";
import axios from "axios";
function Test() {
  const { idTest, idSectiune } = useParams();
  const [intrebari, setIntrebari] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(idTest);

  const handleOptionChange = (qId, optId, optScor) => {
    const updatedOptions = [...selectedOptions];
    const exist = updatedOptions.findIndex((option) => option.qId === qId);

    if (exist !== -1) {
      updatedOptions[exist] = {
        qId,
        optId,
        optScor,
      };
    } else {
      updatedOptions.push({ qId, optId, optScor });
    }
    setSelectedOptions(updatedOptions);
  };

  const setGrade = () => {
    let grade = 0;
    selectedOptions.forEach((option) => {
      grade += option.optScor;
    });
    setTotalGrade(grade);
  };

  const setTestFunction = async () => {
    await axios(
      `http://localhost:8080/intrebare/getAllIntrebariByTestId/${idTest}`
    )
      .then((rez) => {
        setIntrebari(rez.data.intrebari);
        console.log(rez);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setTestFunction();
  }, []);

  console.log(intrebari);
  return (
    <div className={style.testContainer}>
      {/* <h1>{test.testTitle}</h1> */}
      <div>
        {intrebari.map((quest, qIndex) => {
          return (
            <div key={qIndex} className={style.questionContainer}>
              <div>{quest.text_intrebare}</div>

              <ul className={style.unlist}>
                {quest.varianteDeRaspuns.map((opt, optIndex) => {
                  const qId = `question_${qIndex}`;
                  const optId = `option_${optIndex}`;
                  const optScor = opt.scor;
                  return (
                    <li key={optId}>
                      <input
                        type="radio"
                        name={qId}
                        checked={selectedOptions.some(
                          (option) =>
                            option.qId === qId && option.optId === optId
                        )}
                        onChange={() => handleOptionChange(qId, optId, optScor)}
                      />
                      <div>{opt.text_varianta}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <Link to={`/course/${idSectiune}`}>
          <button className={style.submitBtn} onClick={setGrade}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Test;
