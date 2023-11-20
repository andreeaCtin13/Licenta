import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../styles/admin/AdminHomepage.module.css";
import currentUser from "../../data/mentor.json";
import { UserContext } from "../../context/UserContext";
import { Dialog } from "primereact/dialog";
import users from "../../data/users.json";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Axios } from "axios";

function AdminHomepage() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(currentUser);
  }, []);
  const userCreated = {
    mail: "dani@gmail.com",
    password: "dani",
    status: "mentee",
  };
  const sendData = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8080/useri/register", userCreated)
        .then(() => {
          console.log("a mers");
        })
        .catch((err) => {
          console.log("ups, you have an error, look:", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const emptyUser = {
    name: "",
    mail: "",
    password: "",
    status: "Mentee",
  };

  const [usersRows, setUsersRows] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [rowUser, setRowUser] = useState(emptyUser);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setUsersRows(users);
  }, []);

  const openNew = () => {
    setRowUser(emptyUser);
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

  const createMail = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const generatePassword = () => {
    let password = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 20; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
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
        __row_user.password = generatePassword();

        __users.push(__row_user);
        toast.current.show({
          severity: "succes",
          summary: "Succesful",
          detail: "User Created",
          life: 3000,
        });
      }
      setUsersRows(__users);
      setUserDialog(false);
      setRowUser(emptyUser);
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

  const deleteUser = () => {
    let _users = usersRows.filter((val) => val.mail !== rowUser.mail);
    setUsersRows(_users);
    setDeleteUserDialog(false);
    setRowUser(emptyUser);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "User Deleted",
      life: 3000,
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
      <Button label="Save" icon="pi pi-check" onClick={saveUser} />
    </React.Fragment>
  );
  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Yes"
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
    else _user.name = newVal;
    setRowUser(_user);
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

  return (
    <div className={style.mainContainer}>
      <h1>Hi, Admin!!!</h1>
      <button onClick={sendData}>caca</button>
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
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="mail"
            header="Mail"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column field="status" header="Mentorship Status"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
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
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <InputText
            id="name"
            value={rowUser.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !rowUser.name })}
          />
          {submitted && !rowUser.name && (
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
          <label className="mb-3 font-bold">Status</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="status1"
                name="status"
                value="Mentor"
                onChange={onStatusChange}
                checked={rowUser.status === "Mentor"}
              />
              <label htmlFor="category1">Mentor</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="status2"
                name="status"
                value="Mentee"
                onChange={onStatusChange}
                checked={rowUser.status === "Mentee"}
              />
              <label htmlFor="category2">Mentee</label>
            </div>
          </div>
        </div>
      </Dialog>
      <button
        onClick={() => {
          usersRows.map((x) => {
            console.log(x.mail + " are parola" + x.password);
          });
        }}
      >
        testam parole noi
      </button>
    </div>
  );
}

export default AdminHomepage;
