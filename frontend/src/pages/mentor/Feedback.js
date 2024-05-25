import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/mentor/Feedback.module.css";
import { useParams } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "primereact/dialog";
import { Dock } from "primereact/dock";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Link } from "react-router-dom";
import {
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

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
  const [items, setItems] = useState();
  const [selectedScreen, setSelectedScreen] = useState();
  const [acordeonArray, setAcordeonArray] = useState([]);
  const [sectiuni, setSectiuni] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [idCerinta, setIdCerinta] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [fileToDownload, setFileToDownload] = useState();
  const setData = async (id_cerinta) => {
    await axios
      .get(
        `http://localhost:8080/istoricCerinte/getAll/${idCourse}/${idCerinta}/filter?&take=8&skip=${page}`
      )
      .then((rez) => {
        setAssigmentsRows(rez.data.istoric);

        setTotalRec(Math.ceil(rez.data.count / 8));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setPage(1);

    setData();
  }, []);

  useEffect(() => {
    setData();
  }, [page]);

  const onPageChange = (e, type_event) => {
    if (type_event === "next") {
      if (page !== totalRec / 8) {
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
      <h4 className="m-0">Rezolvări Încărcate</h4>
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

  // const changeVisibility = () => {
  //   setVisible(!visible);
  // };

  const getTheLink = () => {
    const backendFilesDirectory = "/files";
    let file = selectedRow?.rezolvare;
    const fileName = file?.split(`\\`)[file.split(`\\`)?.length - 1];
    const fileRelativePath = `${backendFilesDirectory}/${fileName}`;

    const backendBaseUrl = "http://localhost:8080";
    const fileUrl = `${backendBaseUrl}${fileRelativePath}`;
    console.log("file url", fileUrl);
    setFileToDownload(fileUrl);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={style.btnZoneRequest}>
          <Link
            to={fileToDownload}
            download="Example-PDF-document"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className={`${style.btnRequest}`}
              onClick={() => {
                setSelectedRow(rowData);
                console.log("alo");
                console.log(rowData);
                getTheLink();
              }}
            >
              Descarcă
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  };

  const sendFeedback = async () => {
    await axios
      .put(
        `http://localhost:8080/istoricCerinte/updateIstoricAssigment/${selectedRow?.id_cerinta_istoric}`,
        {
          feedback,
        }
      )
      .then((rez) => {
        console.log("a functionat");
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeView = async (index) => {
    await axios
      .get(`http://localhost:8080/cerinte/getAllCerinte/${index}`)
      .then((rez) => {
        setAcordeonArray(rez.data.cerinte);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSection = async () => {
    await axios
      .get(`http://localhost:8080/sectiuni/selectAll/${idCourse}`)
      .then((rez) => {
        setSelectedScreen(rez.data.sectiuni[0].id_sectiune);
        setSectiuni(rez.data.sectiuni);
        setItems(
          rez.data.sectiuni.map((x, index) => {
            return {
              icon: (
                <button
                  className={style.btnFeedback}
                  onClick={() => {
                    changeView(x.id_sectiune);
                    setSelectedScreen(x.id_sectiune);
                    setActiveIndex(null);
                  }}
                >
                  {index + 1}
                </button>
              ),
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSection();
  }, []);

  useEffect(() => {
    changeView(selectedScreen);
  }, [selectedScreen]);

  useEffect(() => {
    setData(idCerinta);
  }, [idCerinta]);

  const takeIstoricForCurrentAssigment = (event) => {
    if (acordeonArray[event.index]) {
      setIdCerinta(acordeonArray[event.index].id_cerinta);
    }
  };

  return (
    <div className={style.mainContainer}>
      <h1>Feedback</h1>
      <div className="dock-window">
        <Dock className={style.dock} model={items} position="bottom" />
      </div>
      <h2>
        Secțiunea{" "}
        {sectiuni ? (
          sectiuni.find((x) => x.id_sectiune === selectedScreen) ? (
            sectiuni.find((x) => x.id_sectiune === selectedScreen).denumire
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </h2>
      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index);
          takeIstoricForCurrentAssigment(e);
        }}
      >
        {acordeonArray ? (
          acordeonArray.map((x) => {
            return (
              <AccordionTab
                header={x.titlu}
                id={x.id_cerinta}
                key={x.id_cerinta}
              >
                <h3>Cerința aferentă task-ului "{x.titlu}"</h3>
                <p className="m-0"> {x.cerinta}</p>

                <DataTable
                  className={style.dataTable}
                  value={assigmentsRows}
                  dataKey=""
                  rows={10}
                  totalRecords={totalRec}
                  onSelectionChange={(e) => {
                    setSelectedRow(e.value);
                    setVisible(true);
                  }}
                  checked={metaKey}
                  selectionMode="single"
                  selection={selectedRow}
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
                <div className={style.paginationZone}>
                  <button
                    className={style.btnPagination}
                    onClick={(e) => onPageChange(e, "prev")}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <span>
                    Page {page} from {totalRec}
                  </span>
                  <button
                    className={style.btnPagination}
                    onClick={(e) => onPageChange(e, "next")}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </AccordionTab>
            );
          })
        ) : (
          <div>nu exista</div>
        )}
      </Accordion>

      <Dialog
        header="Feedback"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className={style.modalContent}>
          Acordă feedback pentru {selectedRow ? selectedRow.nume : ""}!
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          ></textarea>
          <button className={style.btnTrimitereFeedback} onClick={sendFeedback}>
            Trimite feedback
          </button>
        </p>
      </Dialog>
    </div>
  );
}

export default Feedback;
