import React, { useEffect, useState } from 'react'

export default function Inputbox({input, setInput, setTodos}) {

    // function handleSubmit(){
    //     setTodos((prev)=>{
    //         const newArray = []; // undefined
    //         prev.forEach((element)=>{
    //             newArray.push(element);
    //         })
    //         newArray.push(input);

    //         return newArray;
    //     });
    // }

    function handleSubmit(){
        setTodos((prev)=>[...prev, input]);
    }

    // controlled component - uncontrolled component 
  return (
    <div>
        <input 
        placeholder='Enter the todo here.'
        value={input}
        onChange={(e)=>{
            setInput(e.target.value)
        }}
        required
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
