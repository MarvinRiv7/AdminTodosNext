'use client'
import {startTransition, useOptimistic} from 'react'
import { Todo } from '@prisma/client'
import React from 'react'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
    todo: Todo;
    // TODO: Acciones que quiero llamar
    toggleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({...state, complete: newCompleteValue})
  )

  const onToggleTodo = async () => {
    try {

      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
      
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
    }
  }

  return (
    <>
    <div
      className={`rounded-lg shadow-sm p-5 border-dashed flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0
      ${todo.complete ? ' bg-blue-300 border-blue-500' : 'bg-red-300 border-red-500'}`}
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div 
        //onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
        onClick={onToggleTodo}
        className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60
          bg-blue-100
          ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}
          `}>
            {
              todoOptimistic.complete ? 
              <IoCheckboxOutline size={30}/> :
              <IoSquareOutline size={30}/>
            }
           
        </div>
        <div className='text-center sm:text-left'>
          {todoOptimistic.description}
        </div>
      </div>
  
    </div>
    </>
  );
};

