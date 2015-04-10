var React = require('react'),
    format = require('../../../commons/format');

var FieldText = React.createClass({
    render: function () {
        return <span dangerouslySetInnerHTML={{__html: format(this.props.data) }} />;
    }
});

module.exports = FieldText;
