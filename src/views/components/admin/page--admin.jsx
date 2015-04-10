var React = require('react');

var PageAdmin = React.createClass({
    render: function () {
        return <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#/">Boldium</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href="#/admin/work/edit">Edit work</a>
                            </li>
                            <li>
                                <a href="#/admin/page">Edit top-level pages</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="" style={{marginTop: '50px'}}>
				{ this.props.contents }
            </div>
        </div>;
    }
});

module.exports = PageAdmin;
