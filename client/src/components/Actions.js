import React from "react";
import { Button } from "react-bootstrap";

const Actions = ({
  saveEditInfo,
  canEdit,
  setCanEdit,
  rowIndex,
  rowObjId,
  deleteRow,
}) => {
  return (
    <td>
      {canEdit ? (
        <>
          <Button variant="primary" onClick={saveEditInfo}>
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
          <Button
            variant="danger"
            onClick={() => deleteRow(rowIndex, rowObjId)}
          >
            Delete
          </Button>
        </>
      )}
    </td>
  );
};

export default Actions;
