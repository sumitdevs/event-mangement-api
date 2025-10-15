import express, { urlencoded } from 'express'
import {config} from 'dotenv'
import userRoutes from './src/routes/user.route.js';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.status(200).json({message:'health is ok'});
});

app.use('/api/v1/user',userRoutes);


export default app;