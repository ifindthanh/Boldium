var React = require('react');
var NodeLine = require('./node--type_line.jsx');

var NodeTextModule = React.createClass({
    render: function () {
        var content = this.props.node.lines.map(function (line) {
            return (<NodeLine key={line.id} node={line}/>);
        });
        return (
            <section className="module-text">
                <div className="module-text__border-wrapper">
                    <div className="module-text__border"></div>
                </div>

                <div className="module-text__container">
				    {content}
                </div>
            </section>
            );
    }
});

module.exports = NodeTextModule;