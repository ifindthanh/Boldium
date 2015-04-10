var React = require('react');

var Node = React.createClass({
    render: function () {
        var fields = [];
        for (var k in this.props.type.fields) {
            if (this.props.type.fields.hasOwnProperty(k)) {
                fields.push(<dt key={ k + '-label' }>{ k }</dt>);
                fields.push(<dd key={ k }>{ this.props.node[k].render() }</dd>);
            }
        }
        return <dl>{ fields }</dl>;
    }
});

module.exports = Node;
