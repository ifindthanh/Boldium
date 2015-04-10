function format(text) {
	if (!text) {
		return '';
	}

	return text.trim().replace('\n', '<br />').replace(/\*([^\*]+)\*/g, function(a, b, c) {
		return '<em>' + b + '</em>';
	});
};

module.exports = format;
