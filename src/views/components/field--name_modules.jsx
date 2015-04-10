var React = require('react');

var FieldReferencesModules = React.createClass({
    render: function () {
        return <div className="field--modules">{ this.props.referenced.map(function (t) {
            return t.render()
        }) }</div>;
    }
});

module.exports = FieldReferencesModules;
