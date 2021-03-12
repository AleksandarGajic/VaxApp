import express from 'express';
import * as bodyParser from 'body-parser';
import { requestLogMiddleware, errorMiddleware } from '../middlewares';
import { queueService, messageService } from '../services';
import * as kafkaProvider from '../providers';
import * as messagesRepository from '../repository/messages';
import { routing } from './routing';

const app = express(),
      port = 8081,
      messagingService = messageService(messagesRepository),
      queueServiceInit = queueService(kafkaProvider, messagingService);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.CUSTOMER_PORT || port);
app.use(requestLogMiddleware);

app.use(routing(messagingService, queueServiceInit));
app.use(errorMiddleware);

//Subscribe to topic for getting new shimpents
queueServiceInit.receiveMessages();

export default app;
