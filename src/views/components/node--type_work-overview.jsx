var React = require('react'),
    animate = require('../../controllers/animate'),
    NodeWorkCategory = require('./node--type_work-category.jsx');

var NodeWorkOverview = React.createClass({
    _select: function (id, event) {
        var refId = 'category-' + id;
        var top = React.findDOMNode(this.refs[refId]).getBoundingClientRect().top + window.scrollY - 80;
        var start = document.body.scrollTop,
            change = top - start,
            duration = 500;
        animate(duration, function (t) {
            document.body.scrollTop = animate.easeInOutQuad(t, start, change, duration);
        });
        event.preventDefault();
    },
    render: function () {
        var categories = this.props.node.categories, self = this;
        var cats = categories.map(function (category) {
            return (
                <li className="work-overview--category">
                    <a key={ category.id } onClick={ self._select.bind(self, category.id) }>
					{ category.name }
                    </a>
                </li>);
        });
        var items = categories.map(function (category) {
            return <NodeWorkCategory key={ category.id } ref={'category-' + category.id} node={ category }/>;
        });
        return <div>
            <div className="work-overview--categories">
                <ul>{ cats }</ul>
            </div>
			{ items }
        </div>;
    }
});

module.exports = NodeWorkOverview;
