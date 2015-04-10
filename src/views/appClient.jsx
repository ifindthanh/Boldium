var React = require('react');
var Page = require('./components/page.jsx');

var App = React.createClass({
    getInitialState: function () {
        return {info: [], data: [], overviews: []};
    },

    initialize: function (data) {
        document.title = data.title;
        this.setState({info: data.info});
    },

    overviews: function (data) {
        console.log('Overviews ---------------');
        console.log(data);
        this.setState({overviews: data.overviews});
    },

    content: function (data) {
        console.log('Content ---------------');
        console.log(data);
        this.setState({data: data.data});
    },

    componentWillReceiveProps: function (newProps, oldProps) {
    },

    componentDidMount: function () {
        socket.on('common', this.initialize);
        socket.on('content', this.content);
        socket.on('overviews', this.overviews);
    },

    render: function () {
        return (
            <Page url={HOST} full={PAGE != "thanks"} info={this.state.info}
            contents={this.state.data} overviews={this.state.overviews}/>
            );
//        return (<div>
//            <Header info={this.state.info} url={this.props.url} />
//            <ContactForm info={this.state.info} url={this.props.url}/>
//            <Footer info={this.state.info} />
//        </div>);
    }
});

React.render(
    <App />,
    document.getElementById('content')
);