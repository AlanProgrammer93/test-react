# Frontend: carpeta client 
- Instalar dependencias con "npm install"
- Ejecutar con "npm run dev"

# Backend: carpeta server
- Crear archivo .env en la raiz de la carpeta. tomar de ejemplo example.env para completar el archivo. (puede pedirme la url de la base de datos que usé)
- Instalar dependencias con "npm install"
- Ejecutar con "npm start"

# Datos para probar el proyecto
- Usuarios de ejemplo: 
    Rol user: User1 123456, User2 123456.  
    Rol admin: Admin 123456

- se puede registrar usuario con: http://localhost:5000/api/auth/register
    {
        "username": "Admin",
        "password": "123456",
        "role": "admin"
    }
- se puede agregar pedidos con: http://localhost:5000/api/order/create
    {
        "userId": "6544ffd8ed57a98506526bb5",
        "client": "Agustin Sayago",
        "product": "Silla Gamer",
        "quantity": 1,
        "status": "En espera"
    }
