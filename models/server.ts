import express,{Application} from 'express';
import { getUsuario } from '../controllers/usuarios';

import userRoutes from '../routes/usuario';
import { Response } from 'express';
import cors from 'cors';
import db from '../db/connection';


export class Server{

    private app: express.Application
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'

    }



    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
        
    }

    routes() {
        this.app.use(this.apiPaths.usuarios,userRoutes)

    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('database online');
        } catch (error) {
            throw new Error(error);
        }
    }



    middlewares(){

        //cors 
        this.app.use( cors());

        //lectura del body
        this.app.use(express.json());

        //carpeta publica 
        this.app.use(express.static('public'));
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto rr !! '+this.port);
        })
    }


}

export default Server; 