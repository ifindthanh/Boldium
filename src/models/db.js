var _ = require('lodash'),
    assign = require('./../controllers/assign'),
    events = require('events');

var _data = [];

function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.floor(Math.random() * 16);
        if (c == 'x') {
            return r.toString(16);
        }
        else {
            return (8 + (r % 4)).toString(16);
        }
    });
}

function db() {
    return _.chain(_data);
}

_.mixin({
    __empty: function (doc) {
        this.each(doc, function (value, key) {
            delete doc[key];
        });
    },
    __remove: function (array, item) {
        var index = this.indexOf(array, item);
        if (index != -1) {
            array.splice(index, 1);
        }
    },

    get: function (collection, id) {
        return this.find(collection, { id: id });
    },

    put: function (collection, doc, _emitBypass) {
        var oldDoc;
        if ((oldDoc = this.get(collection, doc.id))) {
            if (doc._fields) {
                for (var k in doc._fields) {
                    if (doc._fields.hasOwnProperty(k)) {
                        oldDoc[k] = doc[k];
                    }
                }
            }
            else {
                this.__remove(collection, doc);
                collection.push(doc);
            }
        }
        else {
            collection.push(doc);
        }

        db.emit('put', doc.serialize ? doc.serialize() : doc, _emitBypass);

        return doc;
    }
});

db.uuid4 = uuid4;
db.setData = function (d) {
    _data = d;
    db.emit('put', null, true);
};
assign(db, events.EventEmitter.prototype);

module.exports = db;
