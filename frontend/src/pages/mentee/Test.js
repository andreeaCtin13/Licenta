import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import user from "../../data/user.json";
import style from "../../styles/mentee/Test.module.css";

function Test() {
  const { idCourse, idTest } = useParams();
  const test = user.classes[idCourse].sections[idTest].test;
  const [totalGrade, setTotalGrade] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState([]);

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

  return (
    <div className={style.testContainer}>
      <h1>{test.testTitle}</h1>
      <div>
        {test.cerinte.map((quest, qIndex) => {
          return (
            <div key={qIndex} className={style.questionContainer}>
              <div>{quest.intrebare}</div>

              <ul className={style.unlist}>
                {quest.variante.map((opt, optIndex) => {
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
                      <div>{opt.text}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
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
