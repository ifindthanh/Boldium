var React = require('react');

var NodePage = React.createClass({
    render: function () {
        return this.props.node.modules.render();
    }
});

module.exports = NodePage;
