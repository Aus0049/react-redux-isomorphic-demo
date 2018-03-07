/**
 * Created by Aus on 2018/2/28.
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import render from "./render";
import fetch from "./fetch";

const app = new express();
const port = process.env.PORT || '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('*', (req, res, next) => {

    const { promises, store } = fetch(req);

    Promise.all(promises).then(data => {
        const html = render(req, res, store);
        res.send(html);
    }).catch(err =>{
        console.log('err');
        console.log(err);
        res.end('server error,please visit later')
    })

});



app.listen(port);

console.log('server run on port: '+port);