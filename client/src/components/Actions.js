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
          <Button
            className="Button-container"
            variant="primary"
            onClick={saveEditInfo}
          >
            Save
          </Button>
          <Button
            className="Button-container"
            variant="danger"
            onClick={() => setCanEdit(false)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button
            className="Button-container"
            variant="primary"
            onClick={() => setCanEdit(true)}
          >
            Edit
          </Button>
          <Button
            className="Button-container"
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
