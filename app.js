import express from 'express';
import postRouter from './routes/posts.router.js';

const app = express();
const PORT = 3010;

/** (구현) **/
app.use(express.json());
app.use('/', postRouter);

app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`);
});
