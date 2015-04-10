var React = require('react');

var FieldSizeEdit = React.createClass({
    render: function () {
        return <div className="size-edit">
            <div onClick={ this.props.onChange.bind(this, 'large') } className={ "size-edit--large" + (this.props.data == 'large' ? ' selected' : '') }>A</div>
            <div onClick={ this.props.onChange.bind(this, 'small') } className={ "size-edit--small" + (this.props.data == 'small' ? ' selected' : '') }>A</div>
            <div onClick={ this.props.onAdd } className="size-edit--add">+</div>
            <div onClick={ this.props.onRemove } className="size-edit--remove">-</div>
        </div>;
    }
});

module.exports = FieldSizeEdit;
