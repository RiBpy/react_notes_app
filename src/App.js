import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import List from './List';
const getLocalStorage = () => {
  let OldList = localStorage.getItem('list');
  if (OldList) {
    return (OldList = JSON.parse(OldList));  //if any item remains in storage it will be passed through getLocalStorage function
  } else {
    return [];
  }
};
function App() {
  const[list,setList]=useState(getLocalStorage());
  const[name,setName]=useState("");
  const[isEditing,setIsEditing]=useState(false)
  const[editID,setEditID]=useState(null)
  const[alert,setAlert]=useState({
    show:false,
    msg:"",
    type:""
  })
  const submitHandler=(e)=>{
    e.preventDefault()
    if(!name){
      showAlert(true,"Title can not be empty","danger")
    }else if(name && isEditing){
      setList(
        list.map(item=>{
        if(item.id===editID){
          return{...item,title:name}//...item (old letter) +title:name (added letter) 
        }
        return item
      })
      )
      setIsEditing(false);
      setName("");
      setEditID(null)
      showAlert(true,"Editing done","success")
    }else{
      let newItem={
        id:new Date().getTime().toString(),  //to generate unique id for every item
        title:name
      }
      showAlert(true,"Item added","success")
      setList([...list,newItem])  //submitted item and remails items will concat 
      setName("");//input field will be empty
    }
  }
  const editHandler=(id)=>{
   let specificItem=list.find(item=>item.id===id)
    setIsEditing(true)
    setEditID(id)  //pick the item to edit
    setName(specificItem.title)  //show title in input field
  }
  const deleteHandler=(id)=>{
    showAlert(true,"Item deleted","danger")
    setList(list.filter((item)=>item.id!==id))
  }
  const emptyList=()=>{
    showAlert(true,"Empty-list","danger")
    setList([])
  }
  const showAlert=(show=false,msg="",type="")=>{
    setAlert({show,msg,type}) //es-6 ,,it means show:show ,type:type,msg:msg as we are passing parameters with same name as the object has we can write this way.
  }
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  })
  return <section className="section-center">
        <div className="myLogo">
          <img className="logo"src="logo.png" alt="img" />
        </div>
        <form className='grocery-form'>
          {alert.show && <Alert  {...alert} removeAlert={showAlert}/>}
          <h3>Notes Taking App</h3>
          <div className="form-control">
            <input type="text" className='grocery'
            placeholder='e.g Beef' value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className='submit-btn' type="submit" onClick={submitHandler}>{isEditing?"Edit":"Submit"}</button>
          </div>
        </form>
      {list.length>0 &&(
        <div className="grocery-container">
            <List items={list} deleteHandler={deleteHandler} editHandler={editHandler}/>
            <button className="clear-btn" onClick={emptyList}>Clear All</button>
        </div>
      )}
      
  </section>
}

export default App
