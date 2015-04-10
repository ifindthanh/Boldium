/**
 * Created by OS on 4/5/15.
 */

var PageComp = require('./pageComp'),
    WorkPageComp = require('./workPageComp'),
    WorkCategoryComp = require('./workCategoryComp'),
    WorkOverviewComp = require('./workOverviewComp'),
    ImageComp = require('./imageComp'),
    ImageBodyComp = require('./imageBodyComp'),
    LinkComp = require('./linkComp'),
    TextComp = require('./textComp'),
    LineComp = require('./lineComp');

var Factory = function () {
};

Factory.prototype.compClass = PageComp;

Factory.prototype.createComponent = function (datum) {
    switch (datum.type) {
        case "page":
            this.compClass = PageComp;
            break;
        case "image-hero-module":
            this.compClass = ImageComp;
            break;
        case "image-body-module":
            this.compClass = ImageBodyComp;
            break;
        case "text-module":
            this.compClass = TextComp;
            break;
        case "link":
            this.compClass = LinkComp;
            break;
        case "line":
            this.compClass = LineComp;
            break;
        case "work-category":
            this.compClass = WorkCategoryComp;
            break;
        case "work-overview":
            this.compClass = WorkOverviewComp;
            break;
        case "work-page":
            this.compClass = WorkPageComp;
            break;
    }
    return new this.compClass(datum);
};

module.exports = exports = new Factory();