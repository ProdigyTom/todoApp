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
    return knex('todoitems').select('itemid','itemname','itemdescription','listid', 'complete').orderBy('created_at', 'asc').where('itemid', itemId).then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.deleteItemQuery = function deleteItemQuery (itemId, callback) {
    return knex('todoitems').select().where('itemid', itemId).del().then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.createItemQuery = function createItemQuery (params, callback) {
    return knex('todoitems').insert({itemname: params.itemName, itemdescription: params.itemDescription, listid: params.listId}).returning('itemid').then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.editItemQuery = function editItemQuery (params, itemId, callback) {
    var data = {}
    if(params.itemName){data.itemname = params.itemName}
    if(params.itemDescription){data.itemdescription = params.itemDescription}
    if(params.listId){data.listid = params.listId}
    return knex('todoitems').where('itemid', itemId).update(data).then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.getItemsQuery = function getItemsQuery (callback) {
    knex('todoitems').select('itemid','itemname','itemdescription','listid', 'complete').then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

Item.prototype.getItemsForListQuery = function getItemsForListQuery (listId, callback) {
    return knex('todoitems').select('itemid','itemname','itemdescription','listid', 'complete').where('listid', listId).then(function(rows) {
        callback(null, rows);
    }).catch(function (err){
        callback(err);
    });
}

module.exports = Item;
