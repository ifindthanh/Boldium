var React = require('react');

var NodeTextModule = require('./node--type_text-module.jsx'),
    ImageBodyModule = require('./node--type_image-body-module.jsx'),
    ImageHeroModule = require('./node--type_image-hero-module.jsx'),
    OverviewModule = require('./node--type_work-overview.jsx');

var Body = React.createClass({

    render: function () {
        var content = this.props.contents.map(function (datum) {
            if (datum.type == 'text-module') {
                return (<NodeTextModule key={datum.id} node={datum}/>);
            }
            if (datum.type == 'image-hero-module') {
                return (<ImageHeroModule key={datum.id} node={datum}/>);
            }
            if (datum.type == 'image-body-module') {
                return (<ImageBodyModule key={datum.id} node={datum}/>);
            }
            if (datum.type == 'work-overview') {
                return (<OverviewModule key={datum.id} node={datum}/>);
            }
            return '';
        });
        return (
            <div>{content}</div>
            );
    }
});

module.exports = Body;
