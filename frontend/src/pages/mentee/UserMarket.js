import React, { useContext, useEffect, useRef, useState } from "react";
import CoursePresentation from "../../components/mentee/CoursePresentation";
import style from "../../styles/mentee/UserMarket.module.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Toast } from "primereact/toast";
function UserMarket() {
  const { user, setUser } = useContext(UserContext);
  const [cursuri, setCursuri] = useState([]);
  const toast = useRef(null);

  const takeData = async () => {
    await axios
      .get("http://localhost:8080/curs/selectAll/filter?take=10&skip=1")
      .then((response) => {
        console.log("alo");
        setCursuri(response.data.requests.rows);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "eroare incarcare cursuri",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    takeData();
  }, []);

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />

      <h1>Cursuri</h1>
      <div className={style.coursesArea}>
        {cursuri.map((c) => {
          return (
            <div key={c.id_curs}>
              <CoursePresentation
                id={c.id_curs}
                title={c.denumire}
                image={c.imagine_reprezentativa}
                description={c.descriere}
              ></CoursePresentation>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserMarket;
