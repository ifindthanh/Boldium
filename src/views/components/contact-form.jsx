var React = require('react');

var ModuleContact = React.createClass({
    handleSubmit: function () {
        var name = React.findDOMNode(this.refs.name).value.trim();
        var email = React.findDOMNode(this.refs.email).value.trim();
        var message = React.findDOMNode(this.refs.message).value.trim();
        if (!name || !email || !message) {
            return;
        }
    },

    renderInput: function (ele, cssClass, placeHolder, ref) {
        var input;
        if (ele == 'textarea') {
            input = <textarea rows="1" className='contact__textarea' placeholder={placeHolder} name={ref} ref={ref} />;
        } else {
            input = <input type='text' className='contact__input' placeholder={placeHolder} name={ref} ref={ref} />;
        }
        return (
            <div className='contact__item'>
                <div className='contact__icon-wrapper'>
                    <div className={'contact__icon ' + cssClass}></div>
                </div>
                {input}
            </div>
            );
    },

    render: function () {
        return (<section className="contact">
            <div className="contact__border-wrapper">
                <div className="contact__border"></div>
            </div>

            <div className="contact__wrapper">
                <div className="contact__left">
                    <h2>Let's talk</h2>
                    <div className="contact__left-text">
                    Every moment offers the opportunity to discover and create something new. Let's make something great together.
                    </div>
                    <div className="contact__left-contact">
                    {this.props.info.phone1}
                        <br />{this.props.info.email}
                    </div>
                </div>
                <div className="contact__right">
                    <form onSubmit={this.handleSubmit} action={this.props.url + "/doContact"} method="POST">
                        {this.renderInput('text', 'contact__person', 'Name', 'name')}
                        {this.renderInput('text', 'contact__email', 'Email', 'email')}
                        {this.renderInput('textarea', 'contact__pencil', 'Message', 'message')}
                        <div className="contact__submit-wrapper">
                            <input type="submit" className="btn btn-primary" value="Send"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>);
    }
});

module.exports = ModuleContact;
