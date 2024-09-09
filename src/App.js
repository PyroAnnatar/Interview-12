import React, { useState } from "react";

const INITIAL_LIST = [
  { name: "Domates", value: 55.0 },
  { name: "Marul", value: 25.5 },
  { name: "Ekmek", value: 10.99 },
];

function App() {
  return <ItemValueList />;
}

const ItemValueList = () => {
  const [list, setList] = useState(INITIAL_LIST);
  const [newItem, setNewItem] = useState({ name: "", value: "" });

  function handleChange(e) {
    const { name, value } = e.target;

    setNewItem((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const processedValue = parseFloat(newItem.value).toFixed(2);
    if (newItem.name.trim() && !isNaN(processedValue)) {
      setList((prev) => [...prev, { ...newItem, value: processedValue }]);
      setNewItem({ name: "", value: "" });
    }
  }
  function handleDelete(name) {
    setList((prev) => [...prev.filter((item) => item.name !== name)]);
  }
  return (
    <div className="grid grid-cols-3">
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={newItem.name}
        className="border-[1px] border-black pl-2"
        placeholder="İsim"
      ></input>
      <input
        type="number"
        name="value"
        onChange={handleChange}
        value={newItem.value}
        min="0"
        step="0.01"
        className="border-[1px] border-black pl-2"
        placeholder="Fiyat"
      ></input>
      <button
        type="submit"
        onClick={handleSubmit}
        className="border-[1px] border-black bg-gray-200/70 hover:bg-gray-200"
      >
        Gönder
      </button>

      {list.map((item, index) => (
        <React.Fragment key={index}>
          <div className="col-span-1 p-2 text-center">{item.name}</div>
          <div className="col-span-1 p-2 text-center">${item.value}</div>
          <div className=" col-span-1 flex justify-center items-center">
            <div
              className="cursor-pointer "
              onClick={() => handleDelete(item.name)}
            >
              ❌
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default App;
