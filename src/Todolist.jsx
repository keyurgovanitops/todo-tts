import React from 'react'

export default function Todolist({todos, setTodos}) {


    // declarative 
  return (
    <div>
        {
            todos.map((element,index)=>{ // todo ui create
                return(
                <div key={element}>
                    <p>{element}</p>
                    <button>Update</button>
                    <button onClick={()=>{
                        setTodos((prev)=>{
                            const newArray = prev.filter((e,i)=>i!=index);
                            return newArray;
                        })
                    }}>Delete</button>
                </div>
                )
            })
        }
    </div>
  )
}
