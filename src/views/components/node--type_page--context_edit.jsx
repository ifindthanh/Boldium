var React = require('react'),
    db = require('../../models/db'),
    dripType = require('../../controllers/type');

var NodeEdit = React.createClass({
    getInitialState: function () {
        return {};
    },
    _mouseOver: function (k) {
        var state = {};
        Object.keys(this.state).forEach(function (key) {
            if (key.indexOf('over') == 0) {
                state[key] = false;
            }
        });
        state['over' + k] = true;
        this.setState(state);
    },
    _mouseOut: function (k) {
        var state = {};
        state['over' + k];
        this.setState(state);
    },
    _swap: function (k, e) {
        e.preventDefault();

        var modules = this.props.node.modules.serialize().slice();
        var b = modules[k + 1];
        modules[k + 1] = modules[k];
        modules[k] = b;
        this.props.node.modules.unserialize(modules);
        this.props.node.save();
    },
    _remove: function (k, e) {
        e.preventDefault();

        if (!confirm("Are you sure you want to delete this module?")) {
            return;
        }

        var modules = this.props.node.modules.serialize().slice();
        modules.splice(k, 1);
        this.props.node.modules.unserialize(modules);
        this.props.node.save();
    },
    _add: function (k, e) {
        e.preventDefault();

        var modules = this.props.node.modules.serialize().slice();
        modules.splice(k + 1, 0, "add-module");
        this.props.node.modules.unserialize(modules);
        this.props.node.save();
    },
    _add2: function (k, type, e) {
        e.preventDefault();
        var id = this.props.node.id + '--' + db.uuid4();

        var data = {
            id: id,
            type: type
        };
        if (type == 'text-module') {
            var lineId = id + '--' + db.uuid4();
            db().put(dripType.unserialize({
                id: lineId,
                type: 'line',
                text: '',
                title: '',
                size: 'small'
            }));
            data.lines = [ lineId ];
        }

        db().put(dripType.unserialize(data));

        var modules = this.props.node.modules.serialize().slice();
        modules[k] = id;
        this.props.node.modules.unserialize(modules);
        this.props.node.save();
    },
    render: function () {
        var key = 0, self = this;
        var mods = this.props.node.modules.load(), modules = mods.map(function (mod) {
            var k = key++, controls = [];
            if (k > 0) {
                controls.push(<div onClick={ self._swap.bind(self, k - 1) } className="module-edit--control module-edit--up">&#8593;</div>);
            }
            if (k < mods.length - 1) {
                controls.push(<div onClick={ self._swap.bind(self, k) } className="module-edit--control module-edit--down">&#8595;</div>);
            }
            controls.push(<div onClick={ self._remove.bind(self, k) } className="module-edit--control module-edit--close">&times;</div>);
            controls.push(<div onClick={ self._add.bind(self, k) } className="module-edit--control module-edit--add">+</div>);

            var edit;
            if (mod.id == 'add-module') {
                var typesDef = {
                    'image-hero-module': 'Image hero module',
                    'image-body-module': 'Image body module',
                    'text-module': 'Text module'
                }, types = [];
                for (var typeK in typesDef) {
                    if (typesDef.hasOwnProperty(typeK)) {
                        var type = typesDef[typeK];
                        types.push(<li>
                            <a href="#" onClick={ self._add2.bind(self, k, typeK) }>{ type }</a>
                        </li>);
                    }
                }
                edit = (<ul>{ types }</ul>);
            }
            else {
                edit = mod.render('edit');
            }

            return (<div className="module-wrapper" key={ k } onMouseEnter={ self._mouseOver.bind(self, k) } onMouseLeave={ self._mouseOut.bind(self, k) }>
                <div className={ "module-edit" + (self.state['over' + k] ? '' : ' module-edit--hidden') }>{ controls }</div>
				{ edit }
            </div>);
        });
        return <div>
			{ modules }
        </div>;
    }
});

module.exports = NodeEdit;
