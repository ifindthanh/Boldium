var React = require('react');

var FieldReferences = React.createClass({
    render: function () {
        return <span>{ this.props.data.join(', ') }</span>;
    }
});

module.exports = FieldReferences;
