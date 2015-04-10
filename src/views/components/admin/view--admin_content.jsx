var React = require('react');

var AdminContentView = React.createClass({
    render: function () {
        var fields = [];
        for (var k in this.props.data.fields) {
            if (this.props.data.fields.hasOwnProperty(k) && !this.props.data.fields[k].noAdmin) {
                fields.push(<th key={ 'header-' + k }>{ k }</th>);
            }
        }
        fields.push(<th>Actions</th>);
        return <table className="table">
            <thead>
                <tr>{ fields }</tr>
            </thead>
            <tbody>{ this.props.data.content.map(function (d) {
                return d.render('admin');
            }) }</tbody>
        </table>;
    }
});

module.exports = AdminContentView;
