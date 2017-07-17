var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres',
        database: 'toDoAppDatabase',
        port: 5432,
        host: 'localhost',
        password: 'admin'
    }
});

function Item() {
    //stuff
}
Item.prototype.getItemQuery = function getItemQuery (itemId, callback) {
    knex('todoitems').select('id','name','desc','listid', 'complete').orderBy('created_at', 'asc').where('id', itemId).then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.deleteItemQuery = function deleteItemQuery (itemId, callback) {
    knex('todoitems').select().where('id', itemId).del().then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.createItemQuery = function createItemQuery (params, callback) {
    knex('todoitems').insert({name: params.name, desc: params.desc, listid: params.listId, complete: params.complete}).returning('id').then(function(id) {
        callback(null, {id: id[0]});
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.editItemQuery = function editItemQuery (params, itemId, callback) {
    var data = {}
    if(params.name){data.name = params.name}
    if(params.desc){data.desc = params.desc}
    if(params.listId){data.listid = params.listId}
    if(params.complete !== null){data.complete = params.complete}
    knex('todoitems').where('id', itemId).update(data).then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.getItemsQuery = function getItemsQuery (callback) {
    knex('todoitems').select('id','name','desc','listid', 'complete').then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.getItemsForListQuery = function getItemsForListQuery (listId, callback) {
    return knex('todoitems').select('id','name','desc','listid', 'complete').where('listid', listId).then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

module.exports = Item;
