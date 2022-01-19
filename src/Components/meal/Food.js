import React, {useContext} from 'react'
import {FoodsContext} from '../../context';

const Food = ({item}) => {

    const {state, setState}=useContext(FoodsContext);
    
    const onRowClick=(e)=>{
        e.preventDefault();
        function deleteRow(rowid)  
        {   
            //passing rowid to parent for deletion
            setState({currentDeletion:rowid})            
        }  
        var del=window.confirm("Do you want to delete "+item.label+"?");
        if(del!==true) return
        deleteRow(item.trid);
    }
        
    return(
        <tr id={item.trid} className="row-body hr" onClick={onRowClick}>
            <td>{item.label[1] + " ("+item.qta+"gr.)"}</td>
            <td>{item.fat.toString()}</td>
            <td>{item.pro.toString()}</td>
            <td>{item.cho.toString()}</td>
            <td>{item.cal.toString()}</td>
        </tr>
    )
}

export default Food
