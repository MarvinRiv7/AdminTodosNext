import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  return NextResponse.json({
    method: 'GET',
    hola: 'Mundo',
  })
}
export async function POSt(request: Request) { 

  return NextResponse.json({
    method: "POST",
    hola: 'Mundo',
  })
}