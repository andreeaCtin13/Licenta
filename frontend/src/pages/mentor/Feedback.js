import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/mentor/Feedback.module.css";
import { useParams } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faX,
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { UserContext } from "../../context/UserContext";

function Feedback() {
  const { idCourse } = useParams();
  const [page, setPage] = useState(1);
  const [totalRec, setTotalRec] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [metaKey, setMetaKey] = useState();
  const [assigmentsRows, setAssigmentsRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);

  console.log(idCourse);

  useEffect(() => {
    setPage(1);
    setAssigmentsRows([
      {
        nume: "Andreea",
        mail: "Andreea",
        data_finalizare: "24/03/2024",
        rezolvare: "hahaha",
      },
    ]);
  }, []);

  useEffect(() => {}, [page]);
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

  const changeVisibility = () => {
    setVisible(!visible);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={style.btnZoneRequest}>
          <Button
            className={`${style.btnRequest}`}
            content={"Descarcă"}
            onClick={() => {
              setSelectedRow(rowData);
              changeVisibility();
            }}
          ></Button>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={style.mainContainer}>
      <h1>Feedback</h1>

      <DataTable
        value={assigmentsRows}
        dataKey=""
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
          field="data_finalizare"
          header="Data Finalizare"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Rezolvare"
          exportable={false}
          style={{ minWidth: "5rem" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default Feedback;
