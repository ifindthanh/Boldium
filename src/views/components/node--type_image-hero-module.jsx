var React = require('react'),
    animate = require('../../controllers/animate');
var FieldText = require('./field--field_text.jsx');
var FieldLink = require('./field--field_link.jsx');

var NodeImageHero = React.createClass({
    mixins: [ require('./image-module.jsx')(.5) ],
    _onClick: function (ev) {
        if (this.props.node.id == 'home-1') {
            var top = document.getElementsByClassName('contact')[0].getBoundingClientRect().top + window.scrollY + 80;
            var start = document.body.scrollTop,
                change = top - start,
                duration = 1000;
            animate(duration, function (t) {
                document.body.scrollTop = animate.easeInOutQuad(t, start, change, duration);
            });
            ev.preventDefault();
        }
    },
    render: function () {
        var link = this.props.node.link;
        var hasButton = link && link.text;
        return (
            <section ref="section" className={ "module-image1" +
                (hasButton ? '' : ' module-image1--nobutton') +
                (this.props.node.id == 'home-1' ? ' section-home-hero' : '') }
            style={ this._style() }>
                <h2 className="module-image1__text">
                    <FieldText breakOnLine={true} data={this.props.node.title}/>
                </h2>
                { this._button(1, this._onClick) }
            </section>);
    }
});

module.exports = NodeImageHero;