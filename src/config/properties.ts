import dotent from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotent.config();    
}

let PORT = process.env.PORT
let DbUri = process.env.DBURI
const SECRET_KEY = process.env.SECRET_KEY

export {
    PORT, DbUri, SECRET_KEY
}
