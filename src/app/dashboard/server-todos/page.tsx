export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import { NewTodo } from "@/components";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function ServerTodoPage() {

  const user = await getUserServerSession()

  if(!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
  where: {userId: user.id},  
  orderBy: {description: 'asc'}})

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