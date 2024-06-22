import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../styles/admin/AdminHomepage.module.css";
import { UserContext } from "../../context/UserContext";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AdminHomepage() {
  const [usersRows, setUsersRows] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [totalRec, setTotalRec] = useState(1);
  const [rowUser, setRowUser] = useState({
    nume: "",
    mail: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [page, setPage] = useState(1);
  const { user, setUser } = useContext(UserContext);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/useri/register", rowUser)
        .then(() => {
          toast.current.show({
            severity: "succes",
            summary: "Succesful",
            detail: "User Created",
            life: 3000,
          });
          loadData();
        })
        .catch((err) => {
          toast.current.show({
            severity: "fail",
            summary: "Failed",
            detail: err.response.data.message,
            life: 3000,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const openNew = () => {
    setRowUser({
      mail: "",
      nume: "",
      password: "",
      status: "junior",
    });
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const onStatusChange = (e) => {
    let _user = { ...rowUser };
    _user["status"] = e.value;
    setRowUser(_user);
  };

  const saveUser = () => {
    setSubmitted(true);
    if (rowUser.mail && rowUser.mail.trim()) {
      let __users = [...usersRows];
      let __row_user = { ...rowUser };
      const indexByMail = findIndexByMail(__row_user.mail);
      if (indexByMail !== -1) {
        __users[indexByMail] = __row_user;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000,
        });
      } else {
        __users.push(__row_user);
      }
      setRowUser(__users);
      setUserDialog(false);
      setRowUser({
        mail: "",
        nume: "",
        password: "",
        status: "junior",
      });
    }
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteUser = (_user) => {
    setRowUser(_user);
    setDeleteUserDialog(true);
  };

  const downloadCSVRaport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/useri/generateCSVconturi', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Eroare la descărcarea CSV-ului:', error);
    }
  };
  
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </React.Fragment>
    );
  };

  const deleteUser = async () => {
    console.log(rowUser);
    await axios
      .delete("http://localhost:8080/useri/stergere", {
        data: { ...rowUser },
      })
      .then(() => {
        let _users = usersRows.filter((val) => val.mail !== rowUser.mail);
        setUsersRows(_users);
        setDeleteUserDialog(false);
        loadData()
        setRowUser({
          mail: "",
          nume: "",
          password: "",
          status: "junior",
        });
        toast.current.show({
          severity: "success",
          summary: "Succes",
          detail: "Utilizator șters cu succes",
          life: 3000,
        });
      });
  };
  const findIndexByMail = (mail) => {
    let index = -1;
    for (let i = 0; i < usersRows.length; i++) {
      if (usersRows[i].mail === mail) {
        index = i;
        break;
      }
    }
    return index;
  };
  const userDialogFooter = (
    <React.Fragment>
      <Button label="Anulează" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button
        label="Salvează"
        icon="pi pi-check"
        onClick={(e) => {
          if (
            rowUser.hasOwnProperty("nume") &&
            rowUser.hasOwnProperty("mail") &&
            rowUser.hasOwnProperty("password") &&
            rowUser.hasOwnProperty("status")
          ) {
            sendData(e);
            saveUser();
          }
        }}
      />
    </React.Fragment>
  );

  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label="Nu"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Da"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteUser}
      />
    </React.Fragment>
  );

  const onInputChange = (e, field) => {
    const newVal = (e.target && e.target.value) || "";
    let _user = { ...rowUser };
    if (field === "mail") _user.mail = newVal;
    else if (field === "password") _user.password = newVal;
    else _user.nume = newVal;
    setRowUser(_user);
  };

  const onPageChange = (e, type_event) => {
    if (type_event === "next") {
      if (page != totalRec / 8) {
        setPage(page + 1);
      }
    } else {
      if (page != 1) {
        setPage(page - 1);
      }
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Gestionează conturile de utilizator</h4>
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

  const downloadExcelPreferinteCursuri = async () => {
    try {
        const response = await axios.get('http://localhost:8080/curs/getInfoRaportCereriCursuri', {
            responseType: 'blob', 
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'raport_preferinte_cursuri.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Descărcare completă a raportului de preferințe ale cursurilor.');
    } catch (error) {
        console.error('Eroare la descărcarea raportului:', error);
        if (error.response) {
            console.error('Data:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        }
    }
};
const downloadExcelPondereFeedback = async () => {
  try {
      const response = await axios.get('http://localhost:8080/istoricCerinte/getRaportFeedback', {
          responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'raport_feedback_cursuri.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Descărcare completă a raportului de feedback pentru cursuri.');
  } catch (error) {
      console.error('Eroare la descărcarea raportului:', error);
      if (error.response) {
          console.error('Data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
      }
  }
};

  const downloadRaportPerformanta = async () => {
    try {
      const response = await axios.get('http://localhost:8080/useri/generatePerformanceReport', {
        responseType: 'blob',
      });
  
      if (response.status !== 200) {
        throw new Error('Eroare la generarea raportului');
      }
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Performance_Report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Eroare la descărcarea raportului:', error);
    }
  };
  

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Utilizator Nou"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <div className={style.flexing}>
        <Button
          label="Export conturi Utilizatori"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={downloadCSVRaport}
        />
        <Button
          label="Export raport pondere feedback"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={downloadExcelPondereFeedback}
        />
        <Button
        label="Export raport performanta"
        icon="pi pi-upload"
          className="p-button-help"
        onClick={downloadRaportPerformanta}
        />

        <Button
          label="Export Preferinte Cursuri"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={downloadExcelPreferinteCursuri}
        />
      </div>
    );
  };
  console.log(usersRows);
  const loadData = async () => {
    const students_query = "filter?";
    await axios
      .get(
        `http://localhost:8080/useri/selectAll/${students_query}&take=10&skip=${page}`
      )
      .then((response) => {
        let students = response.data.requests.rows;
        let req = [];
        for (let i = 0; i < students.length; i++) {
          let stud = { ...students[i].studentRequests };
          let { nume, mail, id_utilizator, status } = students[i];
          req.push({
            status,
            nume,
            mail,
            id_utilizator,
            ...stud,
          });
          console.log("count", response.data);
          setTotalRec(Math.ceil(response.data.requests.count / 8)>0?Math.ceil(response.data.requests.count / 8):1);
        }
        setUsersRows(req);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData();
  }, [page]);

  const handleLogout = () => {
    setLogoutDialog(true);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.flex}>
      <h1>Salut, {user.nume}!!!</h1>

        <button
          className={`${style.btn} ${style.btnLogout}`}
          onClick={handleLogout}
        >
          Deconectare
        </button>
      </div>

      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={usersRows}
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
          <Column field="status" header="Mentorship Status"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
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
            Pagina {page} din {totalRec}
          </span>
          <button
            className={style.btnPagination}
            onClick={(e) => onPageChange(e, "next")}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <Dialog
        visible={deleteUserDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {rowUser && (
            <span>
              Sigur vrei să ștergi contul asociat <b>{rowUser.mail}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={logoutDialog}
        onHide={() => setLogoutDialog(false)}
        className={style.modal}
      >
        Sigur vrei să te deconectezi?
        <div className={style.zoneOfBtns}>
          <Link to="/" className={style.link}>
            <button
              className={style.btnLogoutResponse}
              onClick={() => {
                setUser(false);
                setLogoutDialog(false);
              }}
            >
              Da
            </button>
          </Link>
          <button
            className={style.btnLogoutResponse}
            onClick={() => setLogoutDialog(false)}
          >
            Nu
          </button>
        </div>
      </Dialog>

      <Dialog
        visible={userDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Adaugă un nou utilizator"
        modal
        className="p-fluid"
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div  className={style.field}>
          <label htmlFor="nume" className="font-bold">
            Nume
          </label>
          <InputText
            id="nume"
            value={rowUser.nume}
            onChange={(e) => onInputChange(e, "nume")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !rowUser.nume })}
          />
          {submitted && !rowUser.nume && (
            <small className="p-error">Numele este necesar.</small>
          )}
        </div>
        <div className={style.field}>
          <label htmlFor="mail" className={style.label}>
            Mail
          </label>
          <InputText
            id="mail"
            value={rowUser.mail}
            onChange={(e) => onInputChange(e, "mail")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !rowUser.mail })}
          />
          {submitted && !rowUser.mail && (
            <small className="p-error">Mail-ul este necesar.</small>
          )}
        </div>
        <div className={style.field}>
          <label htmlFor="password" className={style.label} >
            Parola
          </label>
          <InputText
            id="password"
            value={rowUser.password}
            onChange={(e) => onInputChange(e, "password")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !rowUser.password,
            })}
          />
          {submitted && !rowUser.password && (
            <small className="p-error">Parola este necesară.</small>
          )}
        </div>
        <div  className={style.field}>
          <label className={style.label}>Status</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="status1"
                name="status"
                value="mentor"
                onChange={onStatusChange}
                checked={rowUser.status === "mentor"}
              />
              <label htmlFor="category1">Mentor</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="status2"
                name="status"
                value="junior"
                onChange={onStatusChange}
                checked={rowUser.status === "junior"}
              />
              <label htmlFor="category2">Junior</label>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AdminHomepage;
