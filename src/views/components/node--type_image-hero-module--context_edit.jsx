var React = require('react');

var NodeImageHero = React.createClass({
    mixins: [ require('./image-module.jsx')(.5) ],
    render: function () {
        var s = this._style(), button = this._button(1);
        return (<section ref="section" className={ "module-image1" + (this.props.node.link.data && this.props.node.link.data.reference ? '' : ' module-image1--nobutton') } style={ s } onDragEnter={ this._dragenter } onDragOver={ this._dragover } onDrop={ this._drop } onDragExit={ this._dragexit } onMouseMove={ this._mousemove } onMouseUp={ this._mouseup }>
            <h2 className="module-image1__text">
				{ this.props.node.title.render('edit', { onChange: this._change.bind(this, 'title'), breakOnLine: true }) }
            </h2>
			{ button }
            <div className="drag-button" style={{ width: 20, height: 20, backgroundColor: this.state.mouseY ? '#999' : '#ccc', position: 'absolute', bottom: 0}} onMouseDown={ this._mousedown } onDoubleClick={ this._heightClick } />
        </section>);
    }
});

module.exports = NodeImageHero;
