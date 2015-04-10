var React = require('react');

var FieldImage = React.createClass({
    render: function () {
        if (this.props.data) {
            return <img width={ this.props.width } height={ this.props.height } src={ this.props.url } />;
        }
        return <span />;
    }
});

module.exports = FieldImage;
