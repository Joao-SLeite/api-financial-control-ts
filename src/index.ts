import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import { handleServerError, handleUrlNotFound } from './middlewares/errors';
import { ApiError } from './helpers/apiErrors';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(handleUrlNotFound);
    app.use(handleServerError);

    return app.listen(process.env.PORT);
});
