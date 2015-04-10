var React = require('react');
var FieldLink = require('./field--field_link.jsx');
var clamp = function (x, min, max) {
    return Math.max(min, Math.min(max, x));
};

var MOBILE_BREAKPOINT = 480;

var ImageModule = function (scrollBehavior) {
    return {
        getInitialState: function () {
            return {
                dragEnter: false,
                backgroundPosition: null,
                imageHeight: null,
                mobile: window.innerWidth < MOBILE_BREAKPOINT
            };
        },

        componentDidMount: function () {
            window.addEventListener('scroll', this._scroll);
            window.addEventListener('resize', this._resize);
            var self = this;
            var img = new Image();
            img.onload = function () {
                self.setState({ imageHeight: img.height });
                self._scroll();
            };
            img.src = '/image/original/' + this.props.node.image;
        },

        componentWillUnmount: function () {
            window.removeEventListener('scroll', this._scroll);
            window.removeEventListener('resize', this._resize);
        },

        _resize: function () {
            console.log(window.innerWidth < MOBILE_BREAKPOINT);
            this.setState({ mobile: window.innerWidth < MOBILE_BREAKPOINT });
        },

        _scroll: function () {
            if (!this.state.imageHeight || this.state.mobile) {
                return;
            }

            var el = this.refs.section.getDOMNode();
            var elHeight = el.offsetTop - el.scrollTop + el.clientTop,
                scrollTop = document.body.scrollTop,
                windowHeight = window.innerHeight,
                viewportHeight = (this.props.node.height /*&& parseInt(this.props.node.height.serialize())*/) || 800,
                imageHeight = this.state.imageHeight;

            var pct = (elHeight - (scrollTop + windowHeight)) / (viewportHeight + windowHeight);
            var diff = (imageHeight - viewportHeight);
            if (scrollBehavior) {
                diff = imageHeight * scrollBehavior;
                pct = 1 - ((viewportHeight - scrollTop) / viewportHeight);
                this.setState({ backgroundPosition: (diff * pct) });
            }
            else {
                if (pct <= 0 && pct >= -1) {
                    //this.setState({ backgroundPosition: diff * -1 * Math.sin(pct * -1 * Math.PI / 2) });
                    //this.setState({ backgroundPosition: diff * -1 * clamp(Math.tan((pct * -1 * Math.PI) + (Math.PI / 2))/10 + 0.5, 0, 1) });
                    //pct = -1 * clamp(Math.tan((pct * -1 * Math.PI) + (Math.PI / 2))/10 + 0.5, 0, 1);

                    // pct = Math.sin(pct * -1 * Math.PI / 2) * -1;
                    //console.log(pct, imageHeight, viewportHeight, (diff * pct))
                    this.setState({ backgroundPosition: (diff * (-1 - pct)) });
                }
            }
        },

        _change: function (field, value) {
            this.props.node[field].unserialize(value);
            this.props.node.save();
            this.forceUpdate();
        },

        _dragenter: function (e) {
            e.preventDefault();
            this.setState({ dragEnter: true });
        },

        _dragover: function (e) {
            e.preventDefault();
        },

        _dragexit: function (e) {
            e.preventDefault();
            this.setState({ dragEnter: false });
        },

        _drop: function (e) {
            e.preventDefault();
            this.setState({ dragEnter: false });
            if (!e.dataTransfer.files[0] ||
                (e.dataTransfer.files[0].type != 'image/jpeg' && e.dataTransfer.files[0].type != 'image/png')) {
                alert('Must upload a jpeg or png image');
            }
            else {
                var self = this;
                (this.state.mobile ? this.props.node.mobileImage : this.props.node.image).upload(e.dataTransfer.files[0], function () {
                    self.props.node.save();
                    self.forceUpdate();
                });
            }
        },

        _mousedown: function (e) {
            e.preventDefault();
            this.setState({
                mouseY: e.pageY,
                initialHeight: (this.state.mobile && parseInt(this.props.node.mobileHeight.serialize())) ||
                    parseInt(this.props.node.height.serialize())
                    || 800
            });
        },

        _mousemove: function (e) {
            if (this.state.mouseY) {
                e.preventDefault();
                (this.state.mobile ? this.props.node.mobileHeight : this.props.node.height).unserialize(this.state.initialHeight + (e.pageY - this.state.mouseY));
                this.props.node.save();
                this.forceUpdate();
            }
        },

        _mouseup: function (e) {
            e.preventDefault();
            this.setState({ mouseY: null });
        },

        _heightClick: function (e) {
            e.preventDefault();
            (this.state.mobile ? this.props.node.mobileHeight : this.props.node.height).unserialize(parseInt(prompt('Height (px)',
                    (this.state.mobile && parseInt(this.props.node.mobileHeight.serialize())) ||
                    (this.props.node.height && parseInt(this.props.node.height.serialize())) ||
                    800
            )));
            this.props.node.save();
        },

        _style: function () {
            var s = {
                height: (this.state.mobile /*&& parseInt(this.props.node.mobileHeight.serialize())*/) ||
                    (this.props.node.height /*&& parseInt(this.props.node.height.serialize())*/) ||
                    800
            };
            if (this.state.mobile && this.props.node.mobileImage.data) {
                s.backgroundImage = 'url(' + this.props.node.mobileImage.getUrl('original') + ')';
            }
            else if (this.props.node.image) {
                s.backgroundImage = 'url(' + '/image/original/' + this.props.node.image + ')';
            }
            else {
                s.backgroundColor = '#bbb';
            }
            if (this.state.dragEnter) {
                s.opacity = 0.7;
            }
            if (this.state.backgroundPosition != null) {
                s.backgroundPositionY = this.state.backgroundPosition + 'px';
            }
            return s;
        },

        _button: function (i, click) {
            var link = this.props.node.link;
            if (link && link.text) {
                return (
                    <div className={ "module-image" + i + "__button-container" }>
                        <FieldLink url={this.props.node.link.url} _click={click ? click : null}
                        text={this.props.node.link.text}/>
                    </div>);
            }
        }
    };
};

module.exports = ImageModule;

/*{ this.props.node.link.render(null, click ? { onClick: click } : null) }*/