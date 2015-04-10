var React = require('react');

var Footer = React.createClass({
    render: function () {
        var info = this.props.info;
        var year = new Date().getFullYear();
        return (<footer className="footer">
            <div className="footer__upper">
                <div className="footer__left">
                    <div className="footer__logo"></div>
                </div>
            </div>

            <div className="footer__lower">
            &copy; {info ? info.since : ""} - {year} {info ? info.fullName : ""}
            &nbsp;&nbsp;{info ? info.email : ""} {info ? info.phone2 : ""}
            </div>
        </footer>);
    }
});

module.exports = Footer;

/*
 <div className="footer__right">
 <div className="footer__fb"></div>
 <div className="footer__twitter"></div>
 <div className="footer__dribble"></div>
 </div>*/
