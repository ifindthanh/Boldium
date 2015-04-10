/**
 * Created by OS on 3/31/15.
 */
var lodash = require('lodash');
var factory = require('../controllers/componentUI/componentFactory');

module.exports = {
    filterByComponent: function (page, db) {
        var components = [];
        var root = lodash.pick(db, page);
        if (!root) {
            return components;
        }
        var rootValue = lodash.valuesIn(root)[0];
        var subModules = lodash.pick(db, rootValue.modules);
        var subValues = lodash.valuesIn(subModules);
        subValues.forEach(function (datum) {
            var subComp = factory.createComponent(datum);
            if (subComp.type == "text-module") {
                subComp.txtLines.forEach(function (txtLine) {
                    var line = lodash.valuesIn(lodash.pick(db, txtLine))[0];
                    var lineComp = factory.createComponent(line);
                    subComp.lines.push(lineComp);
                });
            }
            if (subComp.type == "image-hero-module" || subComp.type == "image-body-module") {
                var txtLink = subComp.txtLink;
                var link = {'text': txtLink.text};
                var reference = lodash.valuesIn(lodash.pick(db, txtLink.reference))[0];
                if (reference) {
                    if (reference.type == "page") {
                        link.url = "";
                    } else if (reference.type == "work-page") {
                        link.url = "/work/" + reference.id;
                    } else if (reference.type == "about") {
                        link.url = "/about/" + reference.id;
                    }
                }
                subComp.link = link;
            }
            if (subComp.type == "work-overview") {
                subComp.categoryIds.forEach(function (categoryId) {
                    var category = lodash.valuesIn(lodash.pick(db, categoryId))[0];
                    var categoryComp = factory.createComponent(category);
                    var itemIds = categoryComp.itemIds;
                    var items = lodash.valuesIn(lodash.pick(db, itemIds));
                    items.forEach(function (item){
                       var itemComp = factory.createComponent(item);
                        categoryComp.items.push(itemComp);
                    });
                    subComp.categories.push(categoryComp);
                });
            }
            components.push(subComp);
        });
        return components;
    }

};