var React = require('react'),
	format = require('../../commons/format');

var FieldText = React.createClass({
	getInitialState: function() {
		return { data: this.props.data, editing: false, height: 0 };
	},
	_edit: function() {
		this.setState({ editing: true });
	},
	_change: function(ev) {
		this.setState({ height: this.refs.textarea.getDOMNode().scrollHeight, data: ev.target.value });
	},
	_blur: function() {
		this.setState({ editing: false, height: 0 });
		this.props.onChange(this.state.data);
	},
	render: function() {
		if (this.state.editing) {
			var h = this.state.height ? { height: this.state.height } : {}, self = this;
			if (this.state.height == 0) {
				setTimeout(function() {
					self.refs.textarea.getDOMNode().focus();
					self.setState({ height: self.refs.textarea.getDOMNode().scrollHeight });
				}, 1);
			}
			return <textarea ref="textarea" className={ this.props.breakOnLine ? 'break-on-line' : '' } style={ h } onBlur={ this._blur } onChange={ this._change } value={this.state.data} />;
		}
		else {
			if (!this.props.breakOnLine) {
				return <span onDoubleClick={ this._edit }  dangerouslySetInnerHTML={{__html: format(this.props.data || '____') }} />;
			}
			else {
				var lines = (this.props.data || '____').replace(/^\s+|\s+$/, '').split(/\s*\n\s*/);
				return <div onDoubleClick={ this._edit }  className="field--text-lines">
					{ lines.map(function(line) {
						return <div className="field--text-line"><span dangerouslySetInnerHTML={{__html: format(line) }} /></div>;
					}) }
				</div>;
			}
		}
	}
});

module.exports = FieldText;
