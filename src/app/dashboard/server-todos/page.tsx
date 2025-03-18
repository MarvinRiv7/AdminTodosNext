export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NewTodo } from "@/components";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function ServerTodoPage() {

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}})
  console.log('Contruido')

  // useEffect(() => {
  //   fetch('/api/todos').then(resp => resp.json())
  //   .then(console.log)
  
  // }, [])
  

  return (
    <>
    <span className="text-3xl mb-10">Server Actions</span>
    <div>
      <div className="w-full px-3 mx-5 mb-5">
      <NewTodo/>
      </div> 
      <TodosGrid todos={todos}/>
    </div>
    </>
  );
}