import fs from 'fs';
import path from 'path';

import express from "express";
import bodyParser from "body-parser";
import helmet from 'helmet';
import morgan from 'morgan';

import SnippetManager from "./model/SnippetManager";

import Database from "./database/database";

import search from "./routes/search";
import add from "./routes/add";
import name from "./routes/name";
import error from "./middleware/errorMiddleware";

SnippetManager.shared = new SnippetManager(new Database);

const logStream = fs.createWriteStream(path.join(__dirname, 'access.logs'), {flags: 'a'});

const app = express();

app.use(helmet());
app.use(morgan('combined', {stream: logStream}));
app.use(bodyParser.json());
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(search);
app.use(add);
app.use(name);

app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
})