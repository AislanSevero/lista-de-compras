import React, { useState, useEffect } from 'react';

const classStyles = {
  Açougue: { backgroundColor: 'rgba(250, 42, 42)' },
  Padaria: { backgroundColor: 'rgb(196, 144, 115)' },
  Mercearia: { backgroundColor: 'rgb(254, 147, 6)' },
  Hortifruti: { backgroundColor: 'rgb(58, 215, 58)' },
  Higiene: { backgroundColor: 'rgb(18, 43, 227, 0.915)' },
  Limpeza: { backgroundColor: 'rgb(42, 217, 252, 0.915)' },
  Diversos: { backgroundColor: 'rgb(155, 16, 255, 0.915)' },
};

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    const storedLists = localStorage.getItem('shoppingLists');
    if (storedLists) {
      setShoppingLists(JSON.parse(storedLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingLists', JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'item') setNewItem(value.charAt(0).toUpperCase() + value.slice(1));
    else if (name === 'unit') setNewUnit(value);
  };

  const handleClassSelection = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);

    if (newItem.trim() !== '' && newUnit.trim() !== '') {
      const updatedItem = { name: newItem, unit: newUnit, completed: false, category: selectedValue };
      setShoppingLists((prevLists) => [...prevLists, updatedItem]);
      setNewItem('');
      setNewUnit('');
      setSelectedClass('');
    }
  };

  const handleToggleComplete = (index) => {
    setShoppingLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists[index].completed = !updatedLists[index].completed;
      return updatedLists;
    });
  };

  const handleRemoveItem = (index) => {
    setShoppingLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(index, 1);
      return updatedLists;
    });
  };

  const getCategoryItems = (category) => {
    return shoppingLists.filter((item) => item.category === category);
  };

  return (
    <div className="App">
      <h1 className="title">Lista de Compras</h1>
      <form className="fill">
        <input
          className="item"
          type="text"
          name="item"
          value={newItem}
          onChange={handleInputChange}
          placeholder="Digite um item"
        />

        <input
          className="unit"
          type="text"
          name="unit"
          value={newUnit}
          onChange={handleInputChange}
          placeholder="Unidade"
        />

        <select
          className="selector"
          name="class"
          value={selectedClass}
          onChange={handleClassSelection}
        >
          <option value="">Selecione uma classe</option>
          <option value="Açougue" style={classStyles.Açougue}>
            Açougue
          </option>
          <option value="Padaria" style={classStyles.Padaria}>
            Padaria
          </option>
          <option value="Mercearia" style={classStyles.Mercearia}>
            Mercearia
          </option>
          <option value="Hortifruti" style={classStyles.Hortifruti}>
            Hortifruti
          </option>
          <option value="Higiene" style={classStyles.Higiene}>
            Higiene
          </option>
          <option value="Limpeza" style={classStyles.Limpeza}>
            Limpeza
          </option>
          <option value="Diversos" style={classStyles.Diversos}>
            Diversos
          </option>
        </select>
      </form>

      <div className="table-container">
        {Object.keys(classStyles).map((category) => (
          <div key={category} style={{ backgroundColor: classStyles[category].backgroundColor }}>
            <h2>{category}</h2>
            <ul>
              {getCategoryItems(category).map((item, index) => (
                <li
                  key={index}
                  className={`checkbox-wrapper ${category}-item`}
                  style={{
                    backgroundColor: classStyles[category].backgroundColor,
                  }}
                >
                  <div className="item-container">
                    <span className={`item-text ${item.completed ? 'completed' : ''}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="item-details">
                    <div className="unit-container">
                      <span className="unit-value">{item.unit}</span>
                    </div>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleComplete(index)}
                      />
                      <img
                        src={require('./lixeira.png')}
                        alt="Remover"
                        onClick={() => handleRemoveItem(index)}
                        className="img-lixeira"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
  