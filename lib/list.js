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

function List() {
    //stuff
}

List.prototype.getListQuery = function getListQuery (res, listId) {
    knex('lists').select('listid','listname','ownerid').where('listid', listId).then(function(rows) {
        res.send(rows);
    });
}

List.prototype.deleteListQuery = function deleteListQuery (res, listId) {
    knex('lists').select().where('listid', listId).del().then(function(rows) {
        res.send(rows);
    });
}

List.prototype.createListQuery = function createListQuery (res, params) {
    knex('lists').insert({listname: params.listName, ownerid: params.ownerId}).returning('listid').then(function(listid) {
        res.send({'listId': parseInt(listid)});
    });
}

List.prototype.editListQuery = function editListQuery (res, params, listId) {
    var data = {};
    if(params.listName){data.listname = params.listName;}
    if(params.ownerId){data.ownerid = parseInt(params.ownerId);}
    knex('lists').where('listid', listId).update(data).then(function(rows) {
        res.send(rows);
    });
}

List.prototype.getListsQuery = function getListsQuery (res) {
    knex('lists').select('listid','listname','ownerid').then(function(rows) {
        res.send(rows);
    });
}

List.prototype.getListsForUserQuery = function getListsForUserQuery (res, ownerId) {
    knex('lists').select('listid','listname','ownerid').where('ownerid', ownerId).then(function(rows) {
        res.send(rows);
    });
}

module.exports = List;
