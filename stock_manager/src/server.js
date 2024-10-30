const express = require ('express');
const usersRoutes = require('./routes/users');

//const app = express();

class Server {
    constructor(){
        //this.app=app;
        this.app=express();
        this.port = 3000;
        //this.app.use(express.json());

        this.middlewares();
        this.routes();
    }

    //Es importante ejecutarlo antes que el de routes 
    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/users', usersRoutes);
    }
    
    start(){
        this.app.listen(3000, () => {
            console.log('Server listening on port '+ this.port);
        });
        }
}
   
module.exports={Server};