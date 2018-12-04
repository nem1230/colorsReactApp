import config from './config';
import fs from 'fs';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));
server.use(bodyParser.json())
server.set('view engine', 'ejs');

import serverRender from './serverRender.js';

server.get(['/', '/color/:colorId'], (req, res) => {
  serverRender(req.params.colorId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

server.use('/api', apiRouter)
server.use(express.static('public'));


server.listen(config.port, config.host, () => {
  console.info('Express Listening On Port', config.port);
});
