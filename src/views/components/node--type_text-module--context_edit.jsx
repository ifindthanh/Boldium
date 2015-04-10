var React = require('react'),
    db = require('../../models/db'),
    dripType = require('../../controllers/type');

var NodeTextModuleEdit = React.createClass({
    _add: function () {
        var id = db.uuid4();
        db().put(dripType.unserialize({ id: id, type: 'line', size: 'large', title: '', text: '' }));
        var lines = this.props.node.lines.serialize();
        lines.push(id);
        this.props.node.lines.unserialize(lines);
        this.props.node.save();
        this.forceUpdate();
    },
    _remove: function (i) {
        var lines = this.props.node.lines.serialize();
        lines.splice(i, 1);
        this.props.node.lines.unserialize(lines);
        this.props.node.save();
        this.forceUpdate();
    },
    render: function () {
        var self = this, i = 0;
        return (<section className="module-text">
            <div className="module-text__border-wrapper">
                <div className="module-text__border"></div>
            </div>

            <div className="module-text__container">
				{ this.props.node.lines.load().map(function (l) {
                    return l.render('edit', { onAdd: self._add, onRemove: self._remove.bind(self, i++) });
                }) }
            </div>
        </section>);
    }
});

module.exports = NodeTextModuleEdit;
