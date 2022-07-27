import { useState, useEffect, useContext } from 'react';
import { FoodsContext } from '../../context';
import Meal from '../meal/Meal';
import Print from '../print/print';
import './Body.css';

const Body = () => {
  const { state, setState } = useContext(FoodsContext);
  const [item, setItem] = useState([]);

  const save = () => {
    if (!item || item.length === 0) {
      localStorage.setItem('name', JSON.stringify(state.Foods));
      load();
    } else {
      const upd = [...item, ...state.Foods];
      localStorage.setItem('name', JSON.stringify(upd));
      load();
    }
  };
  const load = () => {
    if (
      !localStorage.getItem('name') ||
      localStorage.getItem('name').length === 0
    ) {
      setItem([]);
    } else {
      setItem(JSON.parse(localStorage.getItem('name')));
    }
  };

  const sum = (obj, attribute) => {
    return obj
      .map((item) => item[attribute])
      .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
  };

  const clear = () => {
    localStorage.setItem('name', JSON.stringify([]));
    load();
  };

  useEffect(() => {
    //everytime currentDeletion's value isn't empty, if user has clicked a meal row, that meal will be removed by Food's state.
    if (state.currentDeletion === '') return;
    let a = state.Foods;
    for (var i = 0; i < a.length; i++) {
      if (a[i].trid === state.currentDeletion) {
        a.splice(i, 1);
        setState({ Foods: a });
      }
    }
  }, [state.currentDeletion]);

  useEffect(() => {
    //if there are any meals in localstorage, there will be loaded into history table.
    load();
  }, []);
  return (
    <>
      <div id="container">
        <Meal name="Breakfast" />
        <Meal name="Lunch" />
        <Meal name="Snack" />
        <Meal name="Dinner" />
        <br />
        <table className="total-table">
          <tr className="total-grid-header">
            <td>Daily Total:</td>
            <td>Fats:</td>
            <td>Proteins:</td>
            <td>Carbs:</td>
            <td>KCals:</td>
          </tr>
          <tr className="total-grid-body">
            <td></td>
            <td>{sum(state.Foods, 'fat').toFixed(1)}</td>
            <td>{sum(state.Foods, 'pro').toFixed(1)}</td>
            <td>{sum(state.Foods, 'cho').toFixed(1)}</td>
            <td>{sum(state.Foods, 'cal').toFixed(1)}</td>
          </tr>
        </table>
        <button className="button-save" onClick={save}>
          Submit Data
        </button>
        <hr />
        <div>
          <div className="local-header">
            <span>History:</span>
            <button onClick={clear}>Clear all data</button>
          </div>
          {item && (
            <div>
              <div className="grid-result-header">
                <td>Meal</td>
                <td>Food</td>
                <td>Fats</td>
                <td>Proteins</td>
                <td>Carbs</td>
                <td>KCals</td>
              </div>
              {item.map(({ label, qta, fat, pro, cho, cal }, index) => (
                <div className="grid-result-body" key={index}>
                  <td>{label[0]}</td>
                  <td>{label[1] + ' (' + qta + 'gr.)'}</td>
                  <td>{fat}</td>
                  <td>{pro}</td>
                  <td>{cho}</td>
                  <td>{cal}</td>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Print data={item} />
    </>
  );
};
export default Body;
