import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/config';
import routerComments from './router/routerComments';
import routerTrucks from './router/routerTrucks';

mongoose.connect(config.mongoUrl, () => {
  console.log("Database is now connected");
})

const app = express();

app.use(bodyParser.json());
app.use('/app/comments', routerComments);
app.use('/app/trucks', routerTrucks);

app.listen(config.port, () => {
  console.log("the app is listening on the port 8080");
});
