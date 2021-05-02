const express = require('express');
const newsRouter = express.Router();
const axios = require('axios');
const API_KEY = require('./api-key');

newsRouter.get('', async(req, res) => {

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`)
        //console.log(newsAPI.data)
        res.render('news', { articles: newsAPI.data.articles })
    } catch (error) {
        if(error.response){
            res.render('news', { articles: null })
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if(error.request){
            res.render('news', { articles: null })
            console.log(error.request)
        } else{
            res.render('news', { articles: null })
            console.log("Error ", error.message)
        }
    }
});

// newsRouter.get('/:id', async(req, res) => {
//     let articleURL = req.params.articles.url

//     try {
//         const newsAPI = await axios.get(`${articleURL}`)
//         res.render('newsSingle', { article: newsAPI.data })
//     } catch (error) {
//         if(error.response){
//             res.render('newsSingle', { article: null })
//             console.log(error.response.data)
//             console.log(error.response.status)
//             console.log(error.response.headers)
//         } else if(error.request){
//             res.render('newsSingle', { article: null })
//             console.log(error.request)
//         } else{
//             res.render('newsSingle', { article: null })
//             console.log("Error ", error.message)
//         }
//     }
// });

newsRouter.post('', async(req, res) => {
    let search = req.body.search

    try {
        const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`)
        res.render('newsSearch', { articles: newsAPI.data })
    } catch (error) {
        if(error.response){
            res.render('newsSearch', { articles: null })
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if(error.request){
            res.render('newsSearch', { article: null })
            console.log(error.request)
        } else{
            res.render('newsSearch', { article: null })
            console.log("Error ", error.message)
        }
    }
});

module.exports = newsRouter;

