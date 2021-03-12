import express from 'express';
import * as bodyParser from 'body-parser';
import { requestLogMiddleware, errorMiddleware } from '../middlewares';
import { queueService, shipmentService } from '../services';
import * as kafkaProvider from '../providers';
import {shipmentRepository} from '../repository/shimpents';

import { routing } from './routing';

const app = express(),
      port = 8080,
      shipmentServiceInit = shipmentService(shipmentRepository),
      queueServiceInit = queueService(kafkaProvider, shipmentServiceInit);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.MANUFACTURER_PORT || port);
app.use(requestLogMiddleware);

app.use(routing(shipmentServiceInit, queueServiceInit));
app.use(errorMiddleware);

queueServiceInit.receiveMessages();

export default app;
