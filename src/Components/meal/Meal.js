import { useState, useEffect, useContext } from 'react';
import Modal from '../modal/Modal';
import { FoodsContext } from '../../context';
import './Meal.css';
import Food from './Food';

const Meal = ({ name }) => {
  const { state, setState } = useContext(FoodsContext);
  const [numrow, setnumrow] = useState(0);
  const [showModal, setshowModal] = useState(false);

  const sum = (obj, attribute) => {
    return obj
      .map((item) => item[attribute])
      .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
  };

  const reducebyatt = (obj, attribute) => {
    return obj.filter((item) => attribute.includes(item.label[0]));
  };

  useEffect(() => {
    if (state.isInserted === false) return;
    AddingRow();
  }, [state.isInserted]);

  const AddingRow = () => {
    setshowModal(false);
    setState({ isInserted: false });
  };

  const newRow = (e) => {
    e.preventDefault();
    setshowModal(true);
  };

  return (
    <>
      <table id={name + 'table'} className="meal-table">
        <thead className="row-header" id={'row1' + name}>
          <td>
            <button className="add-button" onClick={newRow}>
              +
            </button>
          </td>
          <td>{name}</td>
          <td>Fats</td>
          <td>Proteins</td>
          <td>Carbs</td>
          <td>KCals</td>
        </thead>
        <tr className="row-body" id={'row2' + name}>
          <td></td>
          <td id="fattot">
            {sum(reducebyatt(state.Foods, name), 'fat').toFixed(1)}
          </td>
          <td id="protot">
            {sum(reducebyatt(state.Foods, name), 'pro').toFixed(1)}
          </td>
          <td id="carbtot">
            {sum(reducebyatt(state.Foods, name), 'cho').toFixed(1)}
          </td>
          <td id="calstot">
            {sum(reducebyatt(state.Foods, name), 'cal').toFixed(1)}
          </td>
        </tr>
        {reducebyatt(state.Foods, name).length > 0 ? (
          reducebyatt(state.Foods, name).map((item) => <Food item={item} />)
        ) : (
          <></>
        )}
      </table>
      {showModal && (
        <Modal
          closemodal={setshowModal}
          meal={name}
          numrow={numrow}
          setnumrow={setnumrow}
        />
      )}
    </>
  );
};
export default Meal;
