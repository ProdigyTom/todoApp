var express = require('express');
var app = express();
var Item = require(__dirname + '/lib/item');
var Owner = require(__dirname + '/lib/owner');
var List = require(__dirname + '/lib/list');

app.use(express.static('public'))

app.get('/items/:itemId', function (req, res) {
    var item = new Item();
    item.getItemQuery(req.params.itemId, function(err, data){
        if(err){
            res.status(500)
            res.send(err)
        }
        res.send(data);
    });
})

app.delete('/items/:itemId', function (req, res) {
    var item = new Item();
    res.status(204);
    item.deleteItemQuery(req.params.itemId, function(err, data){
        if(err){
            res.status(500)
            res.send(err)
        }
        res.send(data);
    });
})

app.post('/items', function (req, res) {
    if(!req.query.itemName){
        res.status(422);
        res.send('{error: "missing itemName in request"}')
    }else if(!req.query.itemDescription){
        res.status(422);
        res.send('{error: "missing itemDescription in request"}')
    }else if(!req.query.listId){
        res.status(422);
        res.send('{error: "missing listId in request"}')
    }else{
        var item = new Item();
        res.status(201);
        item.createItemQuery(req.query, function(err, data){
            if(err){
                res.status(500)
                res.send(err)
            }
            res.send(data);
        });
    }
})

app.put('/items/:itemId', function (req, res) {
    if(!req.query.itemName && !req.query.itemDescription && !req.query.listId){
        res.status(422);
        res.send('{error: "missing parameters in request"}')
    }else{
        var item = new Item();
        res.status(204);
        item.editItemQuery(req.query, req.params.itemId, function(err, data){
            if(err){
                res.status(500)
                res.send(err)
            }
            res.send(data);
        });
    }
})

app.get('/items', function (req, res) {
    var item = new Item();
    item.getItemsQuery(function(err, data){
        if(err){
            res.status(500)
            res.send(err)
        }
        res.send(data);
    });
})

app.get('/lists/:listId/items', function (req, res) {
    var item = new Item();
    item.getItemsForListQuery(res, req.params.listId);
})

app.get('/lists/:listId', function (req, res) {
    var list = new List();
    list.getListQuery(res, req.params.listId);
})

app.delete('/lists/:listId', function (req, res) {
    var list = new List();
    res.status(204);
    list.deleteListQuery(res, req.params.listId);
})

app.post('/lists', function (req, res) {
    if(!req.query.listName){
        res.status(422);
        res.send('{error: "missing listName in request"}')
    }else if(!req.query.ownerId){
        res.status(422);
        res.send('{error: "missing ownerId in request"}')
    }else{
        var list = new List();
        res.status(201);
        list.createListQuery(res, req.query);
    }
})

app.put('/lists/:listId', function (req, res) {
    if(!req.query.listName && !req.query.ownerId){
        res.status(422);
        res.send('{error: "missing parameters in request"}')
    }else{
        var list = new List();
        res.status(204);
        list.editListQuery(res, req.query, req.params.listId);
    }
})

app.get('/lists', function (req, res) {
    var list = new List();
    list.getListsQuery(res);
})

app.get('/owners/:ownerId/lists', function (req, res) {
    var list = new List();
    list.getListsForUserQuery(res, req.params.ownerId);
})

app.get('/owners/:ownerId', function (req, res) {
    var owner = new Owner();
    owner.getOwnerQuery(res, req.params.ownerId);
})

app.delete('/owners/:ownerId', function (req, res) {
    var owner = new Owner();
    res.status(204);
    owner.deleteOwnerQuery(res, req.params.ownerId);
})

app.post('/owners', function (req, res) {
    var owner = new Owner();
    if(!req.query.ownerName){
        res.status(422);
        res.send('{error: "missing listName in request"}')
    }else{
        res.status(201);
        owner.createOwnerQuery(res, req.query);
    }
})

app.put('/owners/:ownerId', function (req, res) {
    if(!req.query.ownerName){
        res.status(422);
        res.send('{error: "missing parameters in request"}')
    }else{
        var owner = new Owner();
        res.status(204);
        owner.editOwnerQuery(res, req.query, req.params.ownerId);
    }
})

app.get('/owners', function (req, res) {
    var owner = new Owner();
    owner.getOwnersQuery(res);
})

app.get('/owners', function (req, res) {
    res.send()
})

app.use(express.static('frontend'))

app.listen(3000, function () {
  console.log('TODO app API listening on port 3000!')
})
