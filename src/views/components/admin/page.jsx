var React = require('react');

var Page = React.createClass({
    render: function () {
        return <div>{ this.props.contents }</div>;
    }
});

module.exports = Page;
