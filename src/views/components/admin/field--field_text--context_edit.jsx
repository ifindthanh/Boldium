var React = require('react');

var FieldTextEdit = React.createClass({
    _onChange: function (ev) {
        this.props.onChange(ev.target.value);
    },
    render: function () {
        return <input type="text" value={ this.props.data } onChange={ this._onChange } />;
    }
});

module.exports = FieldTextEdit;
