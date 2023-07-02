import React, { useEffect, useState } from "react";
import { MdAddBox, MdDeleteSweep } from "react-icons/md";
 export default function Todo() {
  // Function to retrieve list from local storage
  const fromLocal = () => {
    let list = JSON.parse(localStorage.getItem("list"));
    return list ? list : [];
  };
   // Function to get the next ID for a new item
  const getId = () => {
    let id = Number(localStorage.getItem("id"));
    return id ? id  : 0;
  }
  const [item, setItem] = useState("");
  const [list, setList] = useState(fromLocal);
  const [id, setId] = useState(getId);
   // Function to store list in local storage
  const toLocal = (list,id) => {
    if (list) {
    localStorage.setItem("list", JSON.stringify(list));
    }
    if (id) {
    localStorage.setItem("id", id.toString());
    }
  };
   useEffect(() => {
    toLocal(list,id);
  }, [list,id]);
   // Function to increment ID
  const nextId = () => {
    setId(id + 1);
  };
   // Function to add a new item to the list
  const addItem = () => {
    if (item !== "") {
      setList([...list, { id: id, itemName: item, isDone: false }]);
      nextId();
      setItem("");
    }
  };
   // Function to remove an item from the list
  const removeItem = (id) => {
    let updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    toLocal(updatedList);
  };
   // Event listener for Enter key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  });
   // Function to mark an item as done
  const done = (id) => {
    let updatedList = list.map((item) => {
      if (item.id === id) {
        item.isDone = true;
      }
      return item;
    });
    setList(updatedList);
    toLocal(updatedList);
  };
   return (
    <section>
      <div className="entry">
        <input
          onChange={(e) => {
            setItem(e.target.value);
          }}
          name="taskinput"
          id="taskinput"
          value={item}
          placeholder="add task"
          type="text"
        />
        <button onClick={addItem} className="addbtn">
          <MdAddBox className="addicon"></MdAddBox>
        </button>
      </div>
       <div className="Content">
        {list.map((elem) => {
          return (
            <div
              className={elem.isDone ? "list donelist" : "list"}
              key={elem.id}
              onChange={toLocal(list)}
              onDoubleClick={(e) => {
                done(elem.id);
              }}
            >
              <p>{elem.itemName}</p>
              <button
                className="delete"
                onClick={() => {
                  removeItem(elem.id);
                }}
              >
                <MdDeleteSweep className="del"></MdDeleteSweep>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
