const db = require("../models")

module.exports = {
    findAll: function(req, res){
        db.Article
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        console.log(req.body)
        db.Article
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    delete: function(req, res){
        db.Article
            .findById({_id: req.params.id})
            .then(data => data.remove())
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    }
}