var template = require('./template'),
    resolver = require('./resolver'),
    assign = require('./assign'),
    db = require('./../models/db');

var proto = {
    _get: function (prop) {
        return this._values[prop];
    },
    _set: function (prop, val) {
        if (prop == 'id') {
            throw "Cannot modify id";
        }

        if (typeof this._values[prop] == 'undefined' || val !== this._values[prop]) {
            this._values[prop] = val;
            this._unsaved = true;
            if (this._modified.indexOf(prop) == -1) {
                this._modified.push(prop);
            }
        }
    },
    render: function (context, extra) {
        return template([ 'node', 'type_' + this.type, 'id_' + this.id, 'context_' + context ], assign({
            type: this._options,
            node: this,
            key: 'node-' + this.id + '-' + context
        }, extra));
    },
    viewUrl: function () {
        return '/node/' + this.id;
    },
    editUrl: function () {
        return '/node/' + this.id + '/edit';
    },
    url: function () {
        var self = this, urls = {};
        if (this.viewUrl()) {
            urls[this.viewUrl()] = function () {
                return self.render('page');
            };
        }
        if (this.editUrl()) {
            urls[this.editUrl()] = function (url) {
                return self.render('edit');
            };
        }
        return urls;
    },
    serialize: function () {
        var data = { type: this._options.name };
        for (var k in this._options.fields) {
            if (this._options.fields.hasOwnProperty(k)) {
                data[k] = this[k].serialize();
            }
        }
        if (this.id) {
            data.id = this.id;
        }
        return data;
    },
    clone: function () {
        return module.exports.unserialize(this.serialize());
    },
    save: function () {
        if (!this.id) {
            this._values.id = db.uuid4();
        }
        db().put(this);
    }
};

function type(options) {
    function createGetter(prop) {
        return function () {
            return this._get(prop);
        };
    }

    function createSetter(prop) {
        return function (val) {
            return this._set(prop, val);
        };
    }

    var Type = function (props) {
        if (!(this instanceof Type)) {
            return new Type(props);
        }

        Object.defineProperty(this, '_unsaved', { enumerable: false, writable: true, value: false });
        Object.defineProperty(this, '_modified', { enumerable: false, writable: true, value: [] });
        Object.defineProperty(this, '_values', { enumerable: false, writable: true, value: {} });
        Object.defineProperty(this, '_options', { enumerable: false, writable: false, value: options });

        Object.defineProperty(this, 'type', { enumerable: true, get: function () {
            return options.name;
        } });

        Object.defineProperty(this, 'id', { enumerable: true, get: createGetter('id') });
        if (props.id) {
            this._values.id = props.id;
        }

        for (var f in options.fields) {
            if (options.fields.hasOwnProperty(f)) {
                Object.defineProperty(this, f, {
                    enumerable: true,
                    get: createGetter(f),
                    set: createSetter(f)
                });

                // Gets marked properly as unsaved.
                if (props.hasOwnProperty(f)) {
                    if (props.id) {
                        this._values[f] = props[f];
                    }
                    else {
                        this._set(f, props[f]);
                    }
                }
            }
        }

        for (var method in proto) {
            if (proto.hasOwnProperty(method)) {
                this[method] = proto[method].bind(this);
            }
        }
        for (var method in options) {
            if (options.hasOwnProperty(method) && typeof options[method] == 'function') {
                this[method] = options[method].bind(this);
            }
        }
    };
    Type.fields = options.fields;

    Type.field = {};
    for (var k in options.fields) {
        if (options.fields.hasOwnProperty(k)) {
            Type.field[k] = function (data) {
                this.data = data;
            };
            assign(Type.field[k].prototype, resolver('field', options.fields[k].type).prototype);
            Type.field[k].prototype.options = options.fields[k].options || {};
            Type.field[k].prototype.name = k;
            Type.field[k].prototype.fieldType = options.fields[k].type;
            Type.field[k].prototype.type = options.name;
        }
    }
    Type.prototype._fields = Type.field;

    return Type;
};

type.unserialize = function (data) {
    var T = resolver('type', data.type), d = {}
    if (data.id) {
        d.id = data.id;
    }
    var t = new T(d);

    for (var k in T.field) {
        if (T.field.hasOwnProperty(k)) {
            var f = new T.field[k]();
            f.unserialize(data[k]);
            t[k] = f;
        }
    }
    return t;
};

module.exports = type;
