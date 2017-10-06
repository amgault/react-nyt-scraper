const Article = require('../models/Article.js')
const request = require("request")

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

module.exports = function(app, db){

    //Post route to scrape the articles from the website
    app.get('/search',function(req, res){
        console.log("in search")
        let articles = [];
        let queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=trump&begin_date=20170101&end_date=20170901";
        //Article.find({saved: false}).remove().exec()
        request(queryURLBase, function(error, response){
            let results = JSON.parse(response.body).response.docs;
            console.log(results.length)
            articles = results.map((item, i) => (
                {
                    title: item.headline.main,
                    excerpt: item.snippet,
                    link: item.web_url,
                    date: item.pub_date
                }
            ))
            res.json(articles)
        })
        
    })   
    
    //Get route to get the articles from the database which are saved by the user
    app.get('/saved', function(req, res){
        Article.find({}, function(err, data){
            if(err){
                console.log(err)
            }
            else{
                res.json(data)
            }
        })
    })  
    
    //Post route to be able to save an article selected by user
    app.post('/save', function(req,res){
        var newArticle = new Article(req.body)
            newArticle.save(function(err, data){
            if(err){
                console.log(err)
            }
            else{
                console.log(data)
            }
        })
    })
    
    //Post route to be able to delete an article saved previously by user 
    app.post('/delete/:id', function(req,res){
        Article.find({"_id":req.params.id}).remove(function(err, data){
            if(err){
                console.log(err)
            }
            else {
                res.redirect("/saved")
            }
            
        })
        
    })    



}