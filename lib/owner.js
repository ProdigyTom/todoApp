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

function Owner() {
    //stuff
}

Owner.prototype.getOwnerQuery = function getOwnerQuery (res, ownerId) {
    knex('owners').select('ownerid','ownername').where('ownerid', ownerId).then(function(rows) {
        res.send(rows);
    });
}

Owner.prototype.deleteOwnerQuery = function deleteOwnerQuery (res, ownerId) {
    knex('owners').select().where('ownerid', ownerId).del().then(function(rows) {
        res.send(rows);
    });
}

Owner.prototype.createOwnerQuery = function createOwnerQuery (res, params) {
    knex('owners').insert({ownername: params.ownerName}).returning('ownerid').then(function(ownerid) {
        res.send({'ownerId': parseInt(ownerid)});
    });
}

Owner.prototype.editOwnerQuery = function editOwnerQuery (res, params, ownerId) {
    var data = {}
    if(params.ownerName){data.ownername = params.ownerName}
    knex('owners').where('ownerid', ownerId).update(data).then(function(rows) {
        res.send(rows);
    });
}

Owner.prototype.getOwnersQuery = function getOwnersQuery (res) {
    knex('owners').select('ownerid','ownername').then(function(rows) {
        res.send(rows);
    });
}

module.exports = Owner;
