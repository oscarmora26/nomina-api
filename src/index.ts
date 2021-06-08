import { Server } from './server';
import './config/database'

const server = new Server();
server.start();