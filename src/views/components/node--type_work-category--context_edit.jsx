var React = require('react');

var NodePage = React.createClass({
	_change: function(field, value) {
		this.props.node[field].unserialize(value);
		this.props.node.save();
		this.forceUpdate();
	},
	render: function() {
		var itemNodes = this.props.node.items.load().slice(), items = [];
		var item = itemNodes.shift();
		items.push(<div className="work-category--item-first">{ item.render('overview-edit') }</div>);
		while (itemNodes.length) {
			if (itemNodes.length == 1) {
				var item = itemNodes.shift();
				items.push(<div className="work-category--items">
					<div className="work-category--item-left">{ item.render('overview-edit') }</div>
					<div className="work-category--item-right-empty"></div>
				</div>);
			}
			else {
				var item1 = itemNodes.shift(), item2 = itemNodes.shift();
				items.push(<div className="work-category--items">
					<div className="work-category--item-left">{ item1.render('overview-edit') }</div>
					<div className="work-category--item-right">{ item2.render('overview-edit') }</div>
				</div>);
			}
		}
		return <div className="work-category">
			<div className="work-category--name">{ this.props.node.name.render('edit', { onChange: this._change.bind(this, 'name') }) }</div>
			{ items }
		</div>;
	}
});

module.exports = NodePage;
