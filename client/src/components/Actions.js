import React from "react";
import { Button } from "react-bootstrap";

const Actions = ({ saveInfo, canEdit, setCanEdit, rowIndex, deleteRow }) => {
  return (
    <td>
      {canEdit ? (
        <>
          <Button variant="primary" onClick={saveInfo}>
            Save
          </Button>
          <Button variant="danger" onClick={() => setCanEdit(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button variant="primary" onClick={() => setCanEdit(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => deleteRow(rowIndex)}>
            Delete
          </Button>
        </>
      )}
    </td>
  );
};

export default Actions;
