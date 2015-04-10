var React = require('react');
var FieldText = require('./field--field_text.jsx');

var NodeImageBody = React.createClass({
    mixins: [ require('./image-module.jsx')() ],
    render: function () {
        return (
            <section ref="section" className="module-image2" style={ this._style() }>
                <div className="module-image2__border-wrapper">
                    <div className="module-image2__border"></div>
                </div>

                <div className="module-image2__text-container1">
                    <div className="module-image2__text-container2">
                        <h2 className="module-image2__title">
                            <FieldText data={this.props.node.title}/>
                        </h2>
                        <div className="module-image2__text">
                            <div className="module-image2__text-inner">
                                <FieldText data={this.props.node.text}/>
                            </div>
						{ this._button(2) }
                        </div>
                    </div>
                </div>
            </section>);
    }
});

module.exports = NodeImageBody;
