# Development 
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```
2. Renombrar el .env.template a .env
3. Remplazar las variables de entorno
4. Ejecutar el comando ``` npm instal ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar estos comandos de prisma 
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el seed para [crear la base de datos local](localhost:3000/api/seed)

## Nota: Usuario por defecto
__usuario:__ test1@google.com
__password:__ 123456

# Prisma commads
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```