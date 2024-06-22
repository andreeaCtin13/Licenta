import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/mentor/EditTestPage.module.css";
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const EditTestPage = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idCourse, id_test } = useParams();
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/teste/getAllTestForEdit/${id_test}`);
        const testWithTempIds = {
          ...response.data,
          intrebari: response.data.intrebari.map(intrebare => ({
            ...intrebare,
            tempId: Date.now() + Math.random(),  // ID unic temporar pentru întrebări
            varianteRaspuns: intrebare.varianteRaspuns.map(varianta => ({
              ...varianta,
              tempVarId: Date.now() + Math.random()  // ID unic temporar pentru variantele de răspuns
            }))
          }))
        };
        setTest(testWithTempIds);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };
  
    fetchTest();
  }, [id_test]);
  
  const handleQuestionChange = (event, questionId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.id_intrebare === questionId) {
        return {
          ...intrebare,
          text_intrebare: event.target.value
        };
      }
      return intrebare;
    });
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };

  const handleAnswerChange = (event, questionTempId, answerTempVarId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.tempId === questionTempId) {
        const updatedVarianteRaspuns = intrebare.varianteRaspuns.map(varianta => {
          if (varianta.tempVarId === answerTempVarId) {
            return {
              ...varianta,
              text_varianta: event.target.value
            };
          }
          return varianta;
        });
        return {
          ...intrebare,
          varianteRaspuns: updatedVarianteRaspuns
        };
      }
      return intrebare;
    });
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };
  

  const handleScoreChange = (event, questionId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.id_intrebare === questionId) {
        return {
          ...intrebare,
          punctaj_intrebare: event.target.value
        };
      }
      return intrebare;
    });
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };

  const handleCorrectnessChange = (event, questionTempId, answerTempVarId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.tempId === questionTempId) {
        const updatedVarianteRaspuns = intrebare.varianteRaspuns.map(varianta => {
          if (varianta.tempVarId === answerTempVarId) {
            return {
              ...varianta,
              este_corecta: event.target.value === 'corecta'
            };
          }
          return varianta;
        });
        return {
          ...intrebare,
          varianteRaspuns: updatedVarianteRaspuns
        };
      }
      return intrebare;
    });
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id_intrebare: null,  // id-ul va fi generat de baza de date
      tempId: Date.now() + Math.random(),  // ID unic temporar
      text_intrebare: '',
      punctaj_intrebare: 0,
      varianteRaspuns: []
    };
    setTest({
      ...test,
      intrebari: [...test.intrebari, newQuestion]
    });
  };
  const submitInfo = async () => {
    console.log("Submitting test data:", test); 
    await axios.post(`http://localhost:8080/teste/editareTest/${test.id_test}`, test)
      .then((rez) => {
        console.log(rez);
      }).catch((err) => {
        console.log(err);
      });
  }
  
  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = test.intrebari.filter(intrebare => intrebare.id_intrebare !== questionId);
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };
  const handleAddAnswer = (questionTempId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.tempId === questionTempId) {
        const newAnswer = {
          id_varianta: null,  // id-ul va fi generat de baza de date
          tempVarId: Date.now() + Math.random(),  // ID unic temporar
          text_varianta: '',
          este_corecta: false
        };
        return {
          ...intrebare,
          varianteRaspuns: [...intrebare.varianteRaspuns, newAnswer]
        };
      }
      return intrebare;
    });
  
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };
  
  
  const handleDeleteAnswer = (questionTempId, answerTempVarId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.tempId === questionTempId) {
        const updatedVarianteRaspuns = intrebare.varianteRaspuns.filter(varianta => varianta.tempVarId !== answerTempVarId);
        return {
          ...intrebare,
          varianteRaspuns: updatedVarianteRaspuns
        };
      }
      return intrebare;
    });
  
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };

  const handleMinimPromovareChange = (event) => {
    setTest({
      ...test,
      punctaj_minim_promovare: event.target.value
    });
  };

  if (loading) {
    return <div className={style.editTestContainer}>Loading...</div>;
  }

  if (!test) {
    return <div className={style.editTestContainer}>Test not found</div>;
  }

  console.log("test", test)

  return (
    <div className={style.editTestContainer}>
      <h1 className={style.editTestHeading}>Editare Test</h1>
      <div className={style.editTestDetails}>
        <h2>Detalii</h2>
        <p>ID - {test.id_test}</p>
        <p>
          Punctaj minim de promovare - 
          <input
            type="number"
            value={test.punctaj_minim_promovare}
            onChange={handleMinimPromovareChange}
            className={style.editTestInput}
          />
        </p>
      </div>
      <div className={style.editTestQuestions}>
        <h2>Întrebări</h2>
        {test.intrebari.map((intrebare,index) => (
          <div key={intrebare.tempId} className={style.editTestQuestion}>
            <div className={style.flexing}>
            <h3>Întrebare {index+1}</h3>
            <button onClick={() => handleDeleteQuestion(intrebare.id_intrebare)} className={`${style.iconStergereIntrebare}`}>
              <FontAwesomeIcon  icon={faTrash} />
            </button>
            </div>
            <input
              type="text"
              value={intrebare.text_intrebare}
              onChange={(e) => handleQuestionChange(e, intrebare.id_intrebare)}
              className={style.editTestInput}
            />
            <input
              type="number"
              value={intrebare.punctaj_intrebare}
              onChange={(e) => handleScoreChange(e, intrebare.id_intrebare)}
              className={style.editTestInput}
            />
           
            <ul className={style.editTestAnswerList}>
              {intrebare.varianteRaspuns.map(varianta => (
                <li key={varianta.tempVarId} className={style.editTestAnswerItem}>
                  <input
                    type="text"
                    value={varianta.text_varianta}
                    onChange={(e) => handleAnswerChange(e, intrebare.tempId, varianta.tempVarId)}
                    className={style.editTestInput}
                  />
                  <select
                    value={varianta.este_corecta ? 'corecta' : 'incorecta'}
                    onChange={(e) => handleCorrectnessChange(e, intrebare.tempId, varianta.tempVarId)}
                    className={style.editTestSelect}
                  >
                    <option value="corecta">Corectă</option>
                    <option value="incorecta">Incorectă</option>
                  </select>
                  <button onClick={() => handleDeleteAnswer(intrebare.tempId, varianta.tempVarId)} className={`${style.editTestButton} ${style.deleteAnswer}`}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => handleAddAnswer(intrebare.tempId)} className={`${style.editTestButton} ${style.addAnswer}`}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        ))}
        <button onClick={handleAddQuestion} className={`${style.editTestButton} ${style.addQuestion}`}>Adaugă întrebare</button>
      </div>
      <div className={style.flexing}>
      <Link to={`/mentor-homepage/${idCourse}`}>
        <Button content="Submit" onClick={submitInfo} className={`${style.editTestButton}`}></Button>
      </Link>
      <Link to={`/mentor-homepage/${idCourse}`}>
      <Button content="Anulează" className={`${style.editTestButton}`}></Button>
      </Link>
      </div>
    </div>
  );  
}  

export default EditTestPage;
