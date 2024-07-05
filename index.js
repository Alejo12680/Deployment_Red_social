// Importaciones
import connection from "./database/connection.js";
import express, { json, urlencoded } from "express";
import cors from "cors";
import UserRoutes from './routes/user.js'
import PublicationRoutes from './routes/publications.js'
import FollowRoutes from './routes/follow.js'
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Mensaje de Bienvenida
console.log("API NODE arriba");

// Conexion a la BD
connection();

// Crear servidor de Node:
const app = express();
const puerto = process.env.PORT || 3900;

// Configuracion cors: Permite que las peticiones se hagan correctamente, para el despliegue se modifico los cors{}
app.use(cors({
  origin: '*', // Permitir solicitudes desde cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Conversion de datos (body a objetos JS) para el despliegue se usa el bodyParser.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends: true}))

// Configurar rutas

// Para ver las rutas, toca con los prefijos 
/* localhost:3900/api/follow/test-follow
localhost:3900/api/publications/test-publication
localhost:3900/api/publications/test-user */

app.use('/api/user', UserRoutes);
app.use('/api/publication', PublicationRoutes);
app.use('/api/follow', FollowRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Configuración para servir archivos estáticos (imágenes de avatar)
app.use('./uploads/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));

// Configuración para servir archivos estáticos (imágenes de publicaciones)
app.use('./uploads/publications', express.static(path.join(__dirname, 'uploads', 'publications')));


// Configurar el servidor para escuchar las peticiones HTTP
app.listen(puerto, () => {
  console.log("Servidor de NODE corriendo en el puerto", puerto)
});

export default app;