import express, { urlencoded } from 'express'
import {config} from 'dotenv'
import userRoutes from './src/routes/user.route.js';
import eventRoutes from './src/routes/event.route.js';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_,res)=>{
    res.status(200).json({message:'health is ok'});
});

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/event',eventRoutes);


export default app;