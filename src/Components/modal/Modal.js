import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {FoodsContext} from '../../context';
import './Modal.css'

const Modal=({closemodal, meal, numrow, setnumrow})=>{

    const {state, setState}=useContext(FoodsContext);
    //const {foods, setfoods} = state.Foods;
    
    const [word, setword]=useState('');
    const [foods, setfoods]=useState([]);
    const [isempty, setisempty]=useState(true);
    const [placeh, setplaceh]=useState("");
    const [isActive, setActive] = useState("false");
    const [isLoading, setIsLoading]=useState(false);    
    
    const ToggleClass = () => {
        setActive(!isActive); 
    };

    const {REACT_APP_APP_ID, REACT_APP_APP_KEY}=process.env;

    const cerca=(word)=>{
        if(word!==""){
            setplaceh("");
            axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=${REACT_APP_APP_ID}&app_key=${REACT_APP_APP_KEY}&ingr=${word}&nutrition-type=cooking`)
            .then(res => {
                setfoods(res.data);
                setIsLoading(false);
                setisempty(false);
                hover();
            })
            .catch((error) => {
                if (error.response) {
                    alert("response error!")
                } else if (error.request) {
                    alert("request error!")
                } else {
                }
            });
        }
        else{
            setplaceh("Type here...");
            setIsLoading(false);
            setisempty(false);
        }
    }
    
    const onchangetext=(e)=>{
        e.preventDefault();
        setword(e.target.value);
        setIsLoading(true);   
        cerca(e.target.value);
    }
    const ingrObj={label:"", fat:0, pro:0, cho:0, cal:0}

    useEffect(() => {
        document.getElementById('food').focus();
    },[isActive])

    const hover=()=>{
        for(let i=0;i<=19;i++){
            var item=document.getElementById(i.toString());
            if(item!==null){
                if(i%2==0 || i===0){
                    item.classList.add("violet")
                }
                else{
                    item.classList.add("light-blue")
                }
            }
        }
    }
    const calcolagrammi=(oldObj)=>{
        let text;
        let qta = prompt("Enter amount in grams:", "");
        if (qta == null || qta == "") {
            text = "Your search is empty!";
            return text;
        }else {
            if(isNaN(parseFloat(qta))==true){
                text ="Error";
                return text;
            }else{
                text = parseFloat(qta);
                let newObj={
                    ...oldObj,
                    qta:text.toFixed(1),
                    fat:(oldObj.fat/100*text).toFixed(1), 
                    pro:(oldObj.pro/100*text).toFixed(1), 
                    cho:(oldObj.cho/100*text).toFixed(1), 
                    cal:(oldObj.cal/100*text).toFixed(1)
                }
                return newObj;
            }
        }
    }
    function isObject(obj) {
        return obj === Object(obj);
    }

    return(
        <div className={isActive?'modal':'modal closed'}>
            <div className={isActive?'modal-overlay':'modal-overlay closed'}></div>
            <div className='modal-guts'>
                <div className="modal-header">
                    <span>SEARCH FOOD:</span>
                    <span><button className='button-closemodal' onClick={()=>closemodal(false)}>x</button></span>
                </div>
                <form>
                    <input id="food" type="text" onChange={onchangetext} value={word} placeholder={placeh}/>
                </form>
                <div id='results'>
                    <table className="modal-table">
                        <tr className='table-header'>
                            <td>Food</td>
                            <td>Fats</td>
                            <td>Proteins</td>
                            <td>Carbs</td>
                            <td>KCals</td>
                        </tr>
                        {isLoading ? 
                        <tr className="table-body">
                            <td></td><td>wait...</td>
                        </tr>:
                         
                         !isempty &&
                            foods.hints.map((food, index)=>(
                                <tr id={index} className='table-body' key={index} onClick={(e)=>{
                                    e.preventDefault();
                                    ingrObj.label=[meal, food.food.label];
                                    ingrObj.fat=parseFloat(food.food.nutrients.FAT).toFixed(1);
                                    ingrObj.pro=parseFloat(food.food.nutrients.PROCNT).toFixed(1);
                                    ingrObj.cho=parseFloat(food.food.nutrients.CHOCDF).toFixed(1);
                                    ingrObj.cal=parseFloat(food.food.nutrients.ENERC_KCAL).toFixed(1);
                                    ToggleClass();
                                    let normObj=calcolagrammi(ingrObj);
                                    if(isObject(normObj)==true){
                                        setState({
                                            Foods:[...state.Foods, {...normObj, trid:meal+numrow.toString()}],
                                            currentFood:{...normObj, trid:meal+numrow.toString()},
                                            isInserted:true
                                        });
                                        setnumrow(numrow+1);
                                    }else{
                                        closemodal(false);
                                    }
                                }}>
                                <td>{food.food.label}</td>
                                <td>{parseFloat(food.food.nutrients.FAT).toFixed(1)}</td>
                                <td>{parseFloat(food.food.nutrients.PROCNT).toFixed(1)}</td>
                                <td>{parseFloat(food.food.nutrients.CHOCDF).toFixed(1)}</td>
                                <td>{parseFloat(food.food.nutrients.ENERC_KCAL).toFixed(1)}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Modal;