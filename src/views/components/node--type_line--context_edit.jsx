var React = require('react');

var NodeLineEdit = React.createClass({
    getInitialState: function () {
        return { over: false };
    },
    _change: function (field, value) {
        this.props.node[field].unserialize(value);
        this.props.node.save();
        this.forceUpdate();
    },
    _mouseOver: function () {
        this.setState({ over: true });
    },
    _mouseOut: function () {
        this.setState({ over: false });
    },
    render: function () {
        return (<div className={ "module-text__text" } onMouseEnter={ this._mouseOver } onMouseLeave={ this._mouseOut }>
            <h2 className="module-text__title">
				{ this.props.node.title.render('edit', { onChange: this._change.bind(this, 'title') }) }
            </h2>
            <div className={ "module-text__text-inner module-text__text--" + this.props.node.size.data }>
                <div className={ "module-text__size-edit" + (this.state.over ? '' : ' module-text__size-edit--hidden') }>
					{ this.props.node.size.render('edit', { onChange: this._change.bind(this, 'size'), onAdd: this.props.onAdd, onRemove: this.props.onRemove }) }
                </div>
				{ this.props.node.text.render('edit', { onChange: this._change.bind(this, 'text') }) }
            </div>
        </div>);
    }
});

module.exports = NodeLineEdit;
