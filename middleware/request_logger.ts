import express, { Application, Request,Response,NextFunction} from 'express';
//Logging requests in terminal to help with debugging
const requestLogger = function (req:Request, res:Response, next:NextFunction) {
    console.log('\n===== Incoming Request =====\n');
    console.log(`${new Date()}`);
    console.log(`${req.method} ${req.url}`);
    console.log(`body ${JSON.stringify(req.body)}`);
    console.log('\n============================\n');
    next();
};

module.exports = requestLogger;
