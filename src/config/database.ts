import mongoose from "mongoose";
import chalk from 'chalk';
import { DbUri } from './properties';

mongoose.connect(DbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log(chalk.green('Db Connected')))
    .catch(err => console.log(chalk.red('Error ocurred ', err)))


