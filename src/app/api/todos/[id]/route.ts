import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import { boolean, object, string } from 'yup';

interface Segments {
    params: Promise <{
        id: string
}>
}

export async function GET(request: Request, {params}: Segments) { 

    const {id} = await params
    const todo = await prisma.todo.findFirst({where: {id: id}}); 

    if(!todo) {
        return NextResponse.json({message: `El todo con el id ${id} no existe`}, {status: 404})
    }
    
    return NextResponse.json(todo)
}

const putSchema = object({
    complete: boolean().optional(),
    description: string().optional()
})

export async function PUT(request: Request, {params}: Segments) { 

    const {id} = await params
    const todo = await prisma.todo.findFirst({where: {id: id}}); 

    if(!todo) {
        return NextResponse.json({message: `El todo con el id ${id} no existe`}, {status: 404})
    }

    try {
        const {complete, description, ...rest} = await putSchema.validate(await request.json()) 

     const updateTodo = await prisma.todo.update({
        where: {id},
        data: {complete, description}
    })
    
    return NextResponse.json(updateTodo)
        
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }

    
}