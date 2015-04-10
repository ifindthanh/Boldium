var React = require('react');

var NodeImageBody = React.createClass({
    mixins: [ require('./image-module.jsx')() ],
    render: function () {
        return (<section ref="section" className="module-image2" style={ this._style() } onDragEnter={ this._dragenter } onDragOver={ this._dragover } onDrop={ this._drop } onDragExit={ this._dragexit } onMouseMove={ this._mousemove } onMouseUp={ this._mouseup }>
            <div className="module-image2__border-wrapper">
                <div className="module-image2__border"></div>
            </div>

            <div className="module-image2__text-container1">
                <div className="module-image2__text-container2">
                    <h2 className="module-image2__title">
						{ this.props.node.title.render('edit', { onChange: this._change.bind(this, 'text') }) }
                    </h2>
                    <div className="module-image2__text">
                        <div className="module-image2__text-inner">
							{ this.props.node.text.render('edit', { onChange: this._change.bind(this, 'text') }) }
                        </div>
						{ this._button(2) }
                    </div>
                </div>
            </div>
            <div className="drag-button" style={{ width: 20, height: 20, backgroundColor: this.state.mouseY ? '#999' : '#ccc', position: 'absolute', bottom: 0}} onMouseDown={ this._mousedown } onDoubleClick={ this._heightClick } />
        </section>);
    }
});

module.exports = NodeImageBody;
