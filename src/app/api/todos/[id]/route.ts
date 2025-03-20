import { getUserServerSession } from '@/app/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import { boolean, object, string } from 'yup';

interface Segments {
    params: Promise <{
        id: string
}>
}

const getTodos = async (id: string):Promise<Todo | null> => {

     const user = await getUserServerSession()
      if(!user) {
        return null
      }

    const todo = await prisma.todo.findFirst({where: {id: id}}); 

      if(todo?.userId !== user.id) {
        return null
      }

    return todo
}

export async function GET(request: Request, {params}: Segments) { 

    const todo = await getTodos((await (params)).id)

    if(!todo) {
        return NextResponse.json({message: `El todo con el id ${(await (params)).id} no existe`}, {status: 404})
    }
    
    return NextResponse.json(todo)
}

const putSchema = object({
    complete: boolean().optional(),
    description: string().optional()
})

export async function PUT(request: Request, {params}: Segments) { 

    const todo = await getTodos((await (params)).id)

    if(!todo) {
        return NextResponse.json({message: `El todo con el id ${((await params).id)} no existe`}, {status: 404})
    }

    try {
        const {complete, description, ...rest} = await putSchema.validate(await request.json()) 

     const updateTodo = await prisma.todo.update({
        where: {id: (await params).id},
        data: {complete, description}
    })
    
    return NextResponse.json(updateTodo)
        
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }

    
}