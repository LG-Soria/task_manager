"use client"

import React, { useState, useRef  } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"



function Tablero(props) {

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    setItems([...items, input]);
    setInput("");
    ref.current.focus();
  }


  return (
    <div>
      <input className="h-8 bg-zinc-300 rounded" ref={ref} onChange={handleChange} value={input} />
      <button className="ml-2 w-24 h-8 bg-slate-200 rounded" onClick={handleSubmit}>Add Item</button>

      <DragDropContext  onDragEnd={(result) => console.log(result)} >
        <div className="bg-slate-500 w-full flex flex-row justify-between mt-5">

          <div className="bg-slate-200 w-56">
            <h1 className="mb-3 bg-amber-200 h-10 p-2">To do</h1>
            <Droppable droppableId="toDo">
              {(droppableProvided) => (
              <ul 
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="flex gap-2 flex-col" id="toDo">

             
             {items.map((item, index) => (
              <Draggable key={item} draggableId= {item.index} index={index}>
                  {(draggableProvided) => (
                  <li
                  {...draggableProvided.draggableProps} 
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.dragHandleProps}
                  className="bg-slate-950 w-3/5 m-auto h-14 p-2 text-white" >{item}</li>)}
                </Draggable>
                ))}
             

                {droppableProvided.placeholder}
              </ul>)}
            </Droppable>
          </div>
          
          <div className="bg-slate-200 w-56">
            <h1 className="mb-3 bg-amber-200 h-10 p-2">Por Hacer</h1>
            <ul id="process"><li
              className="bg-slate-950 w-3/5 m-auto h-14 p-2 text-white">Ejemplo</li></ul>
          </div>


          <div className="bg-slate-200 w-56">
            <h1 className="mb-3 bg-amber-200 h-10 p-2">terminado</h1>
            <ul id="done"><li
              className="bg-slate-950 w-3/5 m-auto h-14 p-2 text-white">Ejemplo de terminado</li></ul></div>
        </div>
      </DragDropContext>
    </div>


  )
}



export default Tablero
