var React = require('react'),
    NodeWorkPageOverview = require('./node--type_work-page--context_overview.jsx');

var NodePage = React.createClass({
    render: function () {
        var itemNodes = this.props.node.items.filter(function (x) {
            return x;
        }), items = [];
        if (itemNodes.length) {
            var item = itemNodes.shift();
            items.push(<a href={ '/work/' + item.id } className="work-category--item-first">
                <NodeWorkPageOverview node={item}/>
            </a>);
        }
        while (itemNodes.length) {
            if (itemNodes.length == 1) {
                var item = itemNodes.shift();
                items.push(<div className="work-category--items">
                    <a href={ '/work/' + item.id } className="work-category--item-left">
                        <NodeWorkPageOverview key={item.id} node={item}/>
                    </a>
                    <div className="work-category--item-right-empty"></div>
                </div>);
            }
            else {
                var item1 = itemNodes.shift(), item2 = itemNodes.shift();
                items.push(<div className="work-category--items">
                    <a href={ '/work/' + item1.id } className="work-category--item-left">
                        <NodeWorkPageOverview key={item1.id} node={item1}/>
                    </a>
                    <a href={ '/work/' + item2.id } className="work-category--item-right">
                        <NodeWorkPageOverview key={item2.id} node={item2}/>
                    </a>
                </div>);
            }
        }
        return (
            <div className="work-category">
                <div className="work-category--name">{ this.props.node.name }</div>
			{ items }
            </div>);
    }
});

module.exports = NodePage;

/*
 { item.render('overview') }*/
