import React, { useState } from "react";

import Actions from "./Actions";

const Row = ({ rowObjId, row, rowIndex, deleteRow }) => {
  const [info, setInfo] = useState(row);
  const [canEdit, setCanEdit] = useState(false);
  const [editInfo, setEditInfo] = useState(info);

  const updateEditInfo = (event, index) => {
    const newEditInfo = [...editInfo];
    newEditInfo[index] = event.target.value;
    setEditInfo(newEditInfo);
  };

  const saveEditInfo = () => {
    console.log(editInfo);
    fetch(`/api/rows`, {
      method: "PUT",
      body: JSON.stringify({ rowObjId: rowObjId, data: editInfo }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then((resp) => {
      setInfo(editInfo);
      setCanEdit(false);
    });
  };

  return (
    <tr>
      <td>{rowIndex}</td>
      {canEdit
        ? editInfo.map((data, index) => (
            <td>
              <input
                value={data}
                onInput={(event) => updateEditInfo(event, index)}
              ></input>
            </td>
          ))
        : info.map((data) => <td>{data}</td>)}

      <Actions
        saveEditInfo={saveEditInfo}
        canEdit={canEdit}
        setCanEdit={setCanEdit}
        rowIndex={rowIndex}
        rowObjId={rowObjId}
        deleteRow={deleteRow}
      />
    </tr>
  );
};

export default Row;
