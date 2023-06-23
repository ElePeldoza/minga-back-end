import 'dotenv/config.js'
import './config/db.js'

import createError  from 'http-errors'    //modulo necesario para crear/configurar errores en nuestro servidor
import express  from 'express'            //modulo necesario para levantar y configurar un servidor
import path  from 'path'                  //modulo necesario para conocer la ubicacion de nuestro servidor
import cookieParser  from 'cookie-parser' // maneja cookies/ para configurarlas
import logger  from 'morgan'              // libreria que sirve para registrar las peticiones que se realizan al servidor
import { __dirname } from './utils.js'
import indexRouter  from './routes/index.js' //agregar el .js /esto es el enrutador principal de la aplicación 
import cors from 'cors'
//import usersRouter  from './routes/users'    // es el entutador de ususario pero no lo vamos a hacer asi

let app = express();                      // defino una variable con la ejecucion del modulo de express 

//VIEWS
// view engine setup
// set es un método que CONFIGURA algo
app.set('views', path.join(__dirname, 'views')); //confirguro que  las vistas generadas desde back estan en la carpeta end en VIEWS
app.set('view engine', 'ejs');                   //configuro que las visatas se van a definir con el lenguaje con EJS (motor de plantilla)


//MIDDLEWARES
//SON FUNCIONES QUE SE EJECUTAN con cada peticion y van a PERMITIR/NOPIERMITI REALIZAR ALGO
//Use un metodo que OBLIGA (en este caso) a mi aplicacion a ejecutar algo(una funcion)
app.use(logger('dev'));//obliga al servidor a usar el middleware
app.use(express.json());//obliga al servidor a transforar /manejar formato jason(post/put)
app.use(express.urlencoded({ extended: false }));//obliga al servidor a acceder a consultas complejas(permite leer queries )
//app.use(cookieParser());   //por recomendacion se borra ahorapor que no usaremos cookies 
app.use(express.static(path.join(__dirname, 'public')));//obliga al servidor a generar una carpet de acceso Publico // para que el cliente pueda acceder de manera publica
app.use(cors())

//ENDPOINTS
app.use('/api', indexRouter);      //Obligo al servidor a usar las rutas definidas en en el enrutador principal con la palabrita '/api'
//app.use('/users', usersRouter);//se borraaa

// // catch 404 and forward to error handler               esto son manejadores de errorres que seborran y aun no se usan
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

export default app 
//module.exports = app; 
