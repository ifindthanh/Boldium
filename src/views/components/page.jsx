var React = require('react'),
    Header = require('./header.jsx'),
    Body = require('./body.jsx'),
    Footer = require('./footer.jsx'),
    ContactForm = require('./contact-form.jsx');

var Page = React.createClass({
    render: function () {
        var contact = "";
        if (this.props.full) {
            contact = <ContactForm info={this.props.info} url={this.props.url}/>;
        }
        return (
            <div>
                <Header info={this.props.info} url={this.props.url} />
                <Body contents={this.props.contents} overviews={this.props.overviews}/>
                {contact}
                <Footer info={this.props.info} />
            </div>);
    }
});

module.exports = Page;