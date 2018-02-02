/**
 * Created by Aus on 2018/1/30.
 */
import express from 'express';
import renderFullPage from "./renderFullPage"
import fetchData from "./dataFetch"


const app = new express();
const port = process.env.PORT || '3000';

app.use('*', (req, res, next) => {

    const { promises, store } = fetchData(req)

    Promise.all(promises).then(x => {
        const html = renderFullPage(req, res, store)
        res.send(html)
    }).catch(x=>{
        console.log(x);
        res.end('server error,please visit later')
    })

});

app.listen(port)

console.log('server run on port'+port);
