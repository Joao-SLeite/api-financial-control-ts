import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);
    app.get('/', (req, res) => {
        return res.json({ message: 'Servidor em execução' });
    });

    return app.listen(process.env.PORT);
});
