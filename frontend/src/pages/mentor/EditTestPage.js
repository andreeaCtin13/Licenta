import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function EditTestPage() {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id_test} =useParams()

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/teste/${id_test}`);
        setTest(response.data.test);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [id_test]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!test) {
    return <div>Test not found</div>;
  }

  return (
    <div>
      <h1>Edit Test</h1>
      <div>
        <h2>Details</h2>
        <p>ID: {test.id_test}</p>
        <p>Punctaj minim de promovare: {test.punctaj_minim_promovare}</p>
        <p>Număr de întrebări: {test.numar_intrebari}</p>
      </div>
      <div>
        <h2>Intrebari</h2>
        {test.intrebari.map(intrebare => (
          <div key={intrebare.id_intrebare}>
            <h3>Întrebare {intrebare.id_intrebare}</h3>
            <p>{intrebare.text_intrebare}</p>
            <ul>
              {intrebare.varianteRaspuns.map(varianta => (
                <li key={varianta.id_varianta}>
                  {varianta.text_varianta} - {varianta.este_corecta ? 'Corectă' : 'Incorectă'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTestPage;
