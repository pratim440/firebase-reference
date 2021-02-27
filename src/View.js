import React from "react";
import "./View.css";
import Button from "@material-ui/core/Button";

function View({ id, name, mobile, deleteUser, editUser }) {
  return (
    <div className="view_outer flex">
      <div className="viewText">
        <h3>Name : {name}</h3>
        <h3>Mobile : {mobile}</h3>
      </div>
      <div className="view_buttons flex">
        <Button
          variant="contained"
          color="primary"
          onClick={() => editUser(id)}
        >
          EDIT
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteUser(id)}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
}

export default View;
