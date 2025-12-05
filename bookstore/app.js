import express from 'express';
import router from './routes/Book.routes.js';

export const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API');
});