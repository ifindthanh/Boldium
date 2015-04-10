var React = require('react'),
    animate = require('../../controllers/animate');
;

var Header = React.createClass({
    getInitialState: function () {
        return { collapsed: true };
    },
    _toggle: function () {
        this.setState({ collapsed: !this.state.collapsed });
    },
    _onClick: function (ev) {
        var top = document.getElementsByClassName('contact')[0].getBoundingClientRect().top + window.scrollY + 80;
        var start = document.body.scrollTop,
            change = top - start,
            duration = 1000;
        animate(duration, function (t) {
            document.body.scrollTop = animate.easeInOutQuad(t, start, change, duration);
        });
        ev.preventDefault();
    },
    render: function () {
        var info = this.props.info;
        var items = [
            <li key="home">
                <a href={this.props.url}>Home</a>
            </li>,
            <li key="work">
                <a href={this.props.url + "/work"}>Work</a>
            </li>,
            <li key="about">
                <a href={this.props.url + "/about"}>About</a>
            </li>,
            /*<li><a href="#">Ideas</a></li>,*/
            <li key="contact">
                <a onClick={this._onClick}>Contact</a>
            </li>
        ];
        return (
            <header className="header">
                <nav className="navbar">
                    <div className="navbar-header">
                        <a className={ "navbar-toggle " + (this.state.collapsed ? "collapsed" : "") } onClick={ this._toggle }>
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </a>

                        <a className="brand" href="/">
                            <img alt={info ? info.name : ""} src="/images/logo.png" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
						{ items }
                        </ul>
                    </div>
                </nav>
            </header>);
    }
});

module.exports = Header;
