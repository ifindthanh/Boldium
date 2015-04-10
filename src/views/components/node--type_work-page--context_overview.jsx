var React = require('react');

var NodeWorkPageOverview = React.createClass({
    render: function () {
        var s = {};
        if (this.props.node.image) {
            s.backgroundImage = 'url(/image/original/' + this.props.node.image + ')';
        }
        else {
            s.backgroundColor = '#999';
        }

        return (
            <div className="work-category--item" style={ s }>
                <div className="work-category--item-name">{ this.props.node.name }</div>
                <div className="work-category--item-subname">{ this.props.node.subName }</div>
            </div>);
    }
});

module.exports = NodeWorkPageOverview;
