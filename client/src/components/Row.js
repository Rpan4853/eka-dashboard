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

  const saveInfo = () => {
    setInfo(editInfo);
    setCanEdit(false);
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
        saveInfo={saveInfo}
        canEdit={canEdit}
        setCanEdit={setCanEdit}
        rowIndex={rowIndex}
        deleteRow={deleteRow}
      />
    </tr>
  );
};

export default Row;
