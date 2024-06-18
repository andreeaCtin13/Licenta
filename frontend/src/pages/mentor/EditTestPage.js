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
        setTest(response.data);
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

  const handleAnswerChange = (event, questionId, answerId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.id_intrebare === questionId) {
        const updatedVarianteRaspuns = intrebare.varianteRaspuns.map(varianta => {
          if (varianta.id_varianta === answerId) {
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
          punctaj: event.target.value
        };
      }
      return intrebare;
    });
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };

  const handleCorrectnessChange = (event, questionId, answerId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.id_intrebare === questionId) {
        const updatedVarianteRaspuns = intrebare.varianteRaspuns.map(varianta => {
          if (varianta.id_varianta === answerId) {
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
      id_intrebare: test.intrebari.length + 1,
      text_intrebare: '',
      punctaj: 0,
      varianteRaspuns: []
    };
    setTest({
      ...test,
      intrebari: [...test.intrebari, newQuestion]
    });
  };

  const submitInfo = async() =>{
    await axios.post(`http://localhost:8080/teste/editareTest/${test.id_test}`, test).then((rez)=>{
      console.log(rez)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = test.intrebari.filter(intrebare => intrebare.id_intrebare !== questionId);
    setTest({
      ...test,
      intrebari: updatedQuestions
    });
  };
  const handleAddAnswer = (questionId) => {
    // Find the question object
    const question = test.intrebari.find(intrebare => intrebare.id_intrebare === questionId);
  
    // Calculate the new answer ID based on the maximum existing ID
    const newAnswerId = question.varianteRaspuns.reduce((maxId, varianta) => {
      return varianta.id_varianta > maxId ? varianta.id_varianta : maxId;
    }, 0) + 1;
  
    // Create the new answer object
    const newAnswer = {
      id_varianta: newAnswerId,
      text_varianta: '',
      este_corecta: false
    };
  
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.id_intrebare === questionId) {
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
  
  const handleDeleteAnswer = (questionId, answerId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.id_intrebare === questionId) {
        const updatedVarianteRaspuns = intrebare.varianteRaspuns.filter(varianta => varianta.id_varianta !== answerId);
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
        {test.intrebari.map(intrebare => (
          <div key={intrebare.id_intrebare} className={style.editTestQuestion}>
            <h3>Întrebare {intrebare.id_intrebare}</h3>
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
            <button onClick={() => handleDeleteQuestion(intrebare.id_intrebare)} className={`${style.editTestButton} ${style.deleteQuestion}`}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ul className={style.editTestAnswerList}>
              {intrebare.varianteRaspuns.map(varianta => (
                <li key={varianta.id_varianta} className={style.editTestAnswerItem}>
                  <input
                    type="text"
                    value={varianta.text_varianta}
                    onChange={(e) => handleAnswerChange(e, intrebare.id_intrebare, varianta.id_varianta)}
                    className={style.editTestInput}
                  />
                  <select
                    value={varianta.este_corecta ? 'corecta' : 'incorecta'}
                    onChange={(e) => handleCorrectnessChange(e, intrebare.id_intrebare, varianta.id_varianta)}
                    className={style.editTestSelect}
                  >
                    <option value="corecta">Corectă</option>
                    <option value="incorecta">Incorectă</option>
                  </select>
                  <button onClick={() => handleDeleteAnswer(intrebare.id_intrebare, varianta.id_varianta)} className={`${style.editTestButton} ${style.deleteAnswer}`}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => handleAddAnswer(intrebare.id_intrebare)} className={`${style.editTestButton} ${style.addAnswer}`}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        ))}
        <button onClick={handleAddQuestion} className={`${style.editTestButton} ${style.addQuestion}`}>Adaugă întrebare</button>
      </div>
      <Link to={`/mentor-homepage/${idCourse}`}>
        <Button content ="Submit" onClick={submitInfo}  className={`${style.editTestButton}`}></Button>
      </Link>
    </div>
  );
};

export default EditTestPage;
