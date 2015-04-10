var React = require('react');

var FieldImageEdit = React.createClass({
    getInitialState: function () {
        return { loading: false };
    },
    _onFileChange: function (ev) {
        var file = ev.target.files[0], self = this;

        request = new XMLHttpRequest();
        request.open('POST', '/image', true);
        request.onload = function () {
            self.props.onChange(file.name);
        };
        // request.onerror = console.log;

        var formData = new FormData();
        formData.append('file', file, file.name);
        request.send(formData);
    },
    render: function () {
        var existing;

        if (this.state.loading) {
            return <div>loading</div>;
        }

        if (this.props.data) {
            existing = <div>
                <img width={ this.props.width } height={ this.props.height } src={ this.props.url } />
				{ this.props.data }
            </div>;
        }
        return <div>
			{ existing }
            <input type="file" onChange={ this._onFileChange } />
        </div>;
    }
});

module.exports = FieldImageEdit;
