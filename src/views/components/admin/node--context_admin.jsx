var React = require('react');

var ContextAdmin = React.createClass({
    render: function () {
        var fields = [];
        for (var k in this.props.type.fields) {
            var url = '#' + this.props.node.viewUrl();
            if (this.props.type.fields.hasOwnProperty(k) && !this.props.type.fields[k].noAdmin) {
                if (url) {
                    fields.push(<td key={ k }>
                        <a href={ url }>{ this.props.node[k].render() }</a>
                    </td>);
                }
                else {
                    fields.push(<td key={ k }>{ this.props.node[k].render() }</td>);
                }
            }
        }
        fields.push(<td>
            <a href={ '#' + this.props.node.editUrl() }>Edit</a>
        </td>);
        return <tr>{ fields }</tr>;
    }
});

module.exports = ContextAdmin;
