var React = require('react');

var NodeEdit = React.createClass({
    getInitialState: function () {
        var state = {};
        for (var k in this.props.type.fields) {
            if (this.props.type.fields.hasOwnProperty(k)) {
                state[k] = this.props.node[k].clone();
            }
        }
        return state;
    },
    _onFieldChange: function (k, v) {
        this.state[k].unserialize(v);
        this.forceUpdate();
    },
    _onSave: function () {
        for (var k in this.props.type.fields) {
            if (this.props.type.fields.hasOwnProperty(k)) {
                this.props.node[k] = this.state[k];
            }
        }
        this.props.node.save();
    },
    render: function () {
        var fields = [];
        for (var k in this.props.type.fields) {
            if (this.props.type.fields.hasOwnProperty(k)) {
                fields.push(<dt key={ k + '-label' }>{ k }</dt>);
                fields.push(<dd key={ k }>{ this.state[k].render('edit', { onChange: this._onFieldChange.bind(this, k) }) }</dd>);
            }
        }
        return <form onSubmit={ function (e) {
            e.preventDefault();
        } }>
            <dl>{ fields }</dl>
            <input type="submit" value="Save" onClick={ this._onSave } />
        </form>;
    }
});

module.exports = NodeEdit;
