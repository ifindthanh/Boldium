var React = require('react');
var FieldText = require('./field--field_text.jsx');

var NodeLine = React.createClass({
    render: function () {
        return (
            <div className={ "module-text__text" }>
                <h2 className="module-text__title">
                    <FieldText key={ this.props.node.title } data={ this.props.node.title } />
                </h2>
                <div className={ "module-text__text-inner module-text__text--" + this.props.node.size }>
                    <FieldText key={ this.props.node.text } data={ this.props.node.text } />
                </div>
            </div>);
    }
});

module.exports = NodeLine;
