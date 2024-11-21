const express = require ('express');
const usersRoutes = require('./routes/users');
const staffRoutes = require('./routes/staff');


class Server {
    constructor(){
        
        this.app=express();
        this.port = 3000;

        this.middlewares();
        this.routes();
    }

    //Es importante ejecutarlo antes que el de routes 
    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/users', usersRoutes);
        this.app.use('/staff', staffRoutes);
    }

    start(){
        this.app.listen(3000, () => {
            console.log('Server listening on port '+ this.port);
        });
        }

}


   
module.exports={Server};