import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";
import style from "../../styles/mentor/Requests.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faX,
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [metaKey, setMetaKey] = useState();
  const { idCourse } = useParams();

  const getAllCereri = async () => {
    const query = "query?status=pending";
    await axios
      .get(
        `http://localhost:8080/cereriCurs/getAllCereri/${user.id_utilizator}/${idCourse}/${query}&take=8&skip=${page}`
      )
      .then((rezultat) => {
        console.log("requests:", rezultat);
        console.log("total records:", rezultat.data.number_of_req);
        setRequestRows(rezultat.data.requests);
        setTotalRec(
          Math.ceil(rezultat.data.number_of_req / 8) > 0
            ? Math.ceil(rezultat.data.number_of_req / 8)
            : 1
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    getAllCereri();
  }, [page]);

  const changeVisibility = () => {
    setVisible(!visible);
  };

  const onPageChange = (type_event) => {
    if (type_event === "next") {
      if (page !== totalRec) {
        setPage(page + 1);
      }
    } else {
      if (page !== 1) {
        setPage(page - 1);
      }
    }
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
              setSelectedRow(rowData);
              changeVisibility();
            }}
          ></Button>
          <Button
            className={`${style.btnRequest}`}
            content={<FontAwesomeIcon icon={faX} />}
            onClick={() => {
              setAction("decline");
              setSelectedRow(rowData);
              changeVisibility();
            }}
          ></Button>
        </div>
      </React.Fragment>
    );
  };

  const updateRequest = async () => {
    if (action === "accept") {
      if (selectedRow) {
        console.log("in functie:", selectedRow);

        const requestId = selectedRow.id_cerere;

        console.log("Request ID:", requestId);

        await axios
          .put(`http://localhost:8080/cereriCurs/update/${requestId}`, {
            status: "accepted",
          })
          .then(() => {
            getAllCereri();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.error("No row selected.");
      }
    } else {
      if (action == "decline") {
        if (selectedRow) {
          console.log("in functie:", selectedRow);

          const requestId = selectedRow.id_cerere;

          console.log("Request ID:", requestId);

          await axios
            .put(`http://localhost:8080/cereriCurs/update/${requestId}`, {
              status: "declined",
            })
            .then(() => {
              getAllCereri();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.error("No row selected.");
        }
      }
    }
  };
  console.log(requestRows);
  return (
    <div className={style.mainContainer}>
      <div className={style.btnZone}>
        <Link to={`/mentor-homepage/${idCourse}`}>
          <Button
            className={style.btnBack}
            content={<FontAwesomeIcon icon={faArrowLeft} />}
          ></Button>
        </Link>
      </div>
      <h1>Requests</h1>

      <DataTable
        value={requestRows}
        dataKey="id_request"
        rows={10}
        totalRecords={totalRec}
        onSelectionChange={(e) => setSelectedRow(e.value)}
        metaKeySelection={metaKey}
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
      <div className={style.paginationZone}>
        <button
          className={style.btnPagination}
          onClick={() => onPageChange("prev")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Page {page} from {totalRec}
        </span>
        <button
          className={style.btnPagination}
          onClick={() => onPageChange("next")}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
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
              Sigur vrei sa accepti cererea de inscriere din partea lui{" "}
              {selectedRow ? selectedRow.nume : "x"}?
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
                    changeVisibility();
                  }}
                ></Button>
              </div>
            </div>
          ) : (
            <div>
              Sigur vrei sa refuzi cererea de inscriere a lui{" "}
              {selectedRow ? selectedRow.nume : "x"}?
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
                    changeVisibility();
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
