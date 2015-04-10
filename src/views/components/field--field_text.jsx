var React = require('react'),
    format = require('../../commons/format');

var FieldText = React.createClass({
    render: function () {
        if (!this.props.breakOnLine) {
            return <span dangerouslySetInnerHTML={{__html: format(this.props.data) }} />;
        }
        else {
            var lines = (this.props.data || '').replace(/^\s+|\s+$/, '').split(/\s*\n\s*/);
            return <div className="field--text-lines">
				{
                    lines.map(function (line) {
                        return <div className="field--text-line" key={line.id}>
                            <span dangerouslySetInnerHTML={{__html: format(line) }} />
                        </div>;
                    })
                    }
            </div>;
        }
    }
});

module.exports = FieldText;
