import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import style from "../../styles/mentor/Requests.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function Requests() {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [requestRows, setRequestRows] = useState([]);
  const [action, setAction] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRec, setTotalRec] = useState(1);
  const { user, setUser } = useContext(UserContext);

  const getAllCereri = async () => {
    const query = "query?status=pending";
    console.log(user);
    await axios
      .get(
        `http://localhost:8080/cereriCurs/getAllCereri/${user.id_utilizator}/${query}&take=8&skip=${page}`
      )
      .then((rezultat) => {
        setRequestRows(rezultat.data.requests);

        console.log(rezultat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCereri();
    console.log(requestRows);
  }, []);

  const changeVisibility = () => {
    setVisible(!visible);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Users</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={style.btnZoneRequest}>
          <Button
            className={`${style.btnRequest}`}
            content={<FontAwesomeIcon icon={faCheck} />}
            onClick={() => {
              setAction("accept");
              changeVisibility();
            }}
          ></Button>
          <Button
            className={`${style.btnRequest}`}
            content={<FontAwesomeIcon icon={faX} />}
            onClick={() => {
              setAction("decline");
              changeVisibility();
            }}
          ></Button>
        </div>
      </React.Fragment>
    );
  };

  const updateRequest = async () => {
    //AXIOS CALL BICIZZZZZ

    if (action === "accept") {
      await axios
        .put(`http://localhost:8080/cereriCurs/update/2`)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.btnZone}>
        <Link to={"/mentor-homepage"}>
          <Button
            className={style.btnBack}
            content={<FontAwesomeIcon icon={faArrowLeft} />}
          ></Button>
        </Link>
      </div>
      <h1>Requests</h1>

      <DataTable
        value={requestRows}
        dataKey="mail"
        rows={10}
        globalFilter={globalFilter}
        header={header}
      >
        <Column
          field="nume"
          header="Nume"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="mail"
          header="Mail"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="denumire"
          header="Curs Cerut"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Request"
          exportable={false}
          style={{ minWidth: "5rem" }}
        ></Column>
      </DataTable>
      <Dialog
        visible={visible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={changeVisibility}
      >
        <div>
          {action === "accept" ? (
            <div>
              Sigur vrei sa accepti cererea de inscriere din partea lui x?
              <div className={style.btnZoneModal}>
                <Button
                  className={`${style.declineBtn} ${style.btn}`}
                  content={"Nu"}
                  onClick={changeVisibility}
                ></Button>

                <Button
                  className={`${style.acceptBtn} ${style.btn}`}
                  content={"Da"}
                  onClick={() => {
                    updateRequest();
                  }}
                ></Button>
              </div>
            </div>
          ) : (
            <div>
              Sigur vrei sa refuzi cererea de inscriere a lui y?
              <div className={style.btnZoneModal}>
                <Button
                  className={`${style.declineBtn} ${style.btn}`}
                  content={"Nu"}
                  onClick={changeVisibility}
                ></Button>

                <Button
                  className={`${style.acceptBtn} ${style.btn}`}
                  content={"Da"}
                  onClick={() => {
                    updateRequest();
                  }}
                ></Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default Requests;
