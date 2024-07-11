import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/mentor/EditTestPage.module.css";
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { Toast } from "primereact/toast";
import { useNavigate } from 'react-router-dom';

const EditTestPage = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idCourse, id_test } = useParams();
  const [deletedQuestions, setDeletedQuestions] = useState([]);
const [deletedAnswers, setDeletedAnswers] = useState([]);

  const toast = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/teste/getAllTestForEdit/${id_test}`);
        const testWithTempIds = {
          ...response.data,
          intrebari: response.data.intrebari.map(intrebare => ({
            ...intrebare,
            tempId: Date.now() + Math.random(), 
            varianteRaspuns: intrebare.varianteRaspuns.map(varianta => ({
              ...varianta,
              tempVarId: Date.now() + Math.random()  
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
      id_intrebare: null, 
      tempId: Date.now() + Math.random(),  
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
    if (
      !test.id_test ||
      !test.punctaj_minim_promovare ||
      !test.intrebari ||
      test.intrebari.length < 1
    ) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Nu ai furnizat toate informațiile necesare",
        life: 3000,
      });
      return;
    }
  
    // Verificarea numărului minim de întrebări
    if (test.intrebari.length < 1) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Trebuie să incluzi minim o întrebare",
        life: 3000,
      });
      return;
    }
  
    // Verificarea punctajului minim de promovare
    const totalScore = test.intrebari?.reduce((acc, intrebare) => {
      return acc + Number(intrebare.punctaj_intrebare);
    }, 0);
  
    const minimumPassingScore = Number(test.punctaj_minim_promovare);
  
    console.log("total score:", totalScore);
    console.log("punctaj minim:", minimumPassingScore);
  
    if (minimumPassingScore > totalScore) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail:
          "Punctajul minim de promovare trebuie sa fie cel putin egal cu suma punctajelor intrebarilor",
        life: 3000,
      });
      console.log("vine aici");
      return;
    }
  
    // Trimiterea datelor
    try {
      const response = await axios.post(`http://localhost:8080/teste/editareTest/${test.id_test}`, {
        ...test,
        deletedQuestions,
        deletedAnswers
      });
      toast.current.show({
        severity: "success",
        summary: "Succes",
        detail: "Testul a fost actualizat cu succes",
        life: 3000,
      });
      navigate(`/mentor-homepage/${idCourse}`);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Eroare la actualizarea testului",
        life: 3000,
      });
    }
  };
  
  
  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = test.intrebari.filter(intrebare => intrebare.id_intrebare !== questionId);
    const questionToDelete = test.intrebari.find(intrebare => intrebare.id_intrebare === questionId);
    
    if (questionToDelete && questionToDelete.id_intrebare) {
      setDeletedQuestions([...deletedQuestions, questionToDelete.id_intrebare]);
    }
  
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
  
  console.log(id_test)
  const handleDeleteAnswer = (questionTempId, answerTempVarId) => {
    const updatedQuestions = test.intrebari.map(intrebare => {
      if (intrebare.tempId === questionTempId) {
        const answerToDelete = intrebare.varianteRaspuns.find(varianta => varianta.tempVarId === answerTempVarId);
        
        if (answerToDelete && answerToDelete.id_varianta) {
          setDeletedAnswers([...deletedAnswers, answerToDelete.id_varianta]);
        }
  
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
    const value = event.target.value;
    if (!isNaN(value) && value.trim() !== '') {
      setTest({
        ...test,
        punctaj_minim_promovare: Number(value)
      });
    }
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
      <Toast ref={toast} />
      <h1 className={style.editTestHeading}>Editare Test</h1>
      <h2>Detalii</h2>

      <div className={style.editTestDetails}>
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
        {test.intrebari.map((intrebare, index) => (
          <div key={intrebare.tempId} className={style.editTestQuestion}>
            <div className={style.flexing}>
              <h3>Întrebare {index+1}</h3>
              <button onClick={() => handleDeleteQuestion(intrebare.id_intrebare)} className={`${style.iconStergereIntrebare}`}>
                <FontAwesomeIcon icon={faTrash} />
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
        <Button content="Submit" onClick={(e) => { e.preventDefault(); submitInfo(); }} className={`${style.editTestButton}`}></Button>
        </Link>
        <Link to={`/mentor-homepage/${idCourse}`}>
          <Button content="Anulează" className={`${style.editTestButton}`}></Button>
        </Link>
      </div>
    </div>
  );
}  

export default EditTestPage;
