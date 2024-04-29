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
        setRowUser({
          mail: "",
          nume: "",
          password: "",
          status: "junior",
        });
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "User Deleted",
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
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button
        label="Save"
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

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
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
          setTotalRec(Math.ceil(response.data.requests.count / 8));
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
      <div>
        <button
          className={`${style.btn} ${style.btnLogout}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <h1>Hi, Admin!!!</h1>
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
            Page {page} from {totalRec}
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
              Are you sure you want to delete <b>{rowUser.mail}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={logoutDialog}
        onHide={() => setLogoutDialog(false)}
        className={style.modal}
      >
        Are you sure you want to logout?
        <div className={style.zoneOfBtns}>
          <Link to="/" className={style.link}>
            <button
              className={style.btnLogoutResponse}
              onClick={() => {
                setUser(false);
                setLogoutDialog(false);
              }}
            >
              Yes
            </button>
          </Link>
          <button
            className={style.btnLogoutResponse}
            onClick={() => setLogoutDialog(false)}
          >
            No
          </button>
        </div>
      </Dialog>

      <Dialog
        visible={userDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
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
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="mail" className="font-bold">
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
            <small className="p-error">Mail is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="password" className="font-bold">
            Password
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
            <small className="p-error">Password is required.</small>
          )}
        </div>
        <div className="field">
          <label className="mb-3 font-bold">Status</label>
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
