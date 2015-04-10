var React = require('react');

var FieldLink = React.createClass({
    render: function () {
        return (
            <a className="btn btn-default" href={this.props.url} onClick={ this.props._click }>
            { this.props.text }
            </a>);
    }
});

module.exports = FieldLink;
