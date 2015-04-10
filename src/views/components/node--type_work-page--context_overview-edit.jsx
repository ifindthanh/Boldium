var React = require('react');

var NodeWorkPageOverview = React.createClass({
    getInitialState: function () {
        return { dragenter: false };
    },
    _dragenter: function (e) {
        e.preventDefault();
        this.setState({ dragenter: true });
    },
    _dragover: function (e) {
        e.preventDefault();
    },
    _dragexit: function (e) {
        e.preventDefault();
        this.setState({ dragenter: false });
    },
    _drop: function (e) {
        e.preventDefault();
        this.setState({ dragenter: false });
        if (!e.dataTransfer.files[0] || (e.dataTransfer.files[0].type != 'image/jpeg' && e.dataTransfer.files[0].type != 'image/png')) {
            alert('Must upload a jpeg or png image');
        }
        else {
            var self = this;
            this.props.node.image.upload(e.dataTransfer.files[0], function () {
                self.props.node.save();
                self.forceUpdate();
            });
        }
    },
    _change: function (field, value) {
        this.props.node[field].unserialize(value);
        this.props.node.save();
        this.forceUpdate();
    },
    render: function () {
        var s = {};
        if (this.props.node.image.data) {
            s.backgroundImage = 'url(' + this.props.node.image.getUrl('original') + ')';
        }
        else {
            s.backgroundColor = '#999';
        }

        return <div className="work-category--item" onDragEnter={ this._dragenter } onDragOver={ this._dragover } onDrop={ this._drop } onDragExit={ this._dragexit } style={ s }>
            <div className="work-category--item-name">{ this.props.node.name.render('edit', { onChange: this._change.bind(this, 'name') }) }</div>
            <div className="work-category--item-subname">{ this.props.node.subname.render('edit', { onChange: this._change.bind(this, 'subname') }) }</div>
        </div>;
    }
});

module.exports = NodeWorkPageOverview;
