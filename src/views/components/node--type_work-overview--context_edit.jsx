var React = require('react'),
    db = require('../../models/db'),
    dripType = require('../../controllers/type');

var NodeWorkOverview = React.createClass({
    _change: function (node, field, value) {
        node[field].unserialize(value);
        node.save();
        this.forceUpdate();
    },
    _findPos: function (item) {
        var categories = this.props.node.categories.load().slice(),
            currentCategory = 0,
            currentCategoryI = 0;
        for (var i = 0; i < item; i++) {
            currentCategoryI++;

            // Use a while to handle empty categories in the middle.
            while (currentCategoryI >= categories[currentCategory].items.data.length) {
                currentCategoryI = 0;
                currentCategory++;
            }
        }

        return { cat: currentCategory, i: currentCategoryI };
    },
    _next: function (item, e) {
        e.preventDefault();
        var pos = this._findPos(item), categories = this.props.node.categories.load().slice();

        if (pos.i == categories[pos.cat].items.data.length - 1) {
            // Swapping end of category with beginning of next category
            var modules1 = categories[pos.cat].items.data.slice(),
                modules2 = categories[pos.cat + 1].items.data.slice();
            modules2.unshift(modules1.pop());
            categories[pos.cat].items.unserialize(modules1);
            categories[pos.cat].save();
            categories[pos.cat + 1].items.unserialize(modules2);
            categories[pos.cat + 1].save();
        }
        else {
            var modules = categories[pos.cat].items.data.slice();
            var b = modules[pos.i];
            modules[pos.i] = modules[pos.i + 1];
            modules[pos.i + 1] = b;
            categories[pos.cat].items.unserialize(modules);
        }
        this.forceUpdate();
    },

    _prev: function (item, e) {
        e.preventDefault();
        var pos = this._findPos(item), categories = this.props.node.categories.load().slice();
        if (pos.i == 0) {
            var modules1 = categories[pos.cat - 1].items.data.slice(),
                modules2 = categories[pos.cat].items.data.slice();
            modules1.push(modules2.shift());
            categories[pos.cat - 1].items.unserialize(modules1);
            categories[pos.cat - 1].save();
            categories[pos.cat].items.unserialize(modules2);
            categories[pos.cat].save();
        }
        else {
            var modules = categories[pos.cat].items.data.slice();
            var b = modules[pos.i];
            modules[pos.i] = modules[pos.i - 1];
            modules[pos.i - 1] = b;
            categories[pos.cat].items.unserialize(modules);
        }
        this.forceUpdate();
    },
    _add: function (category, ev) {
        ev.preventDefault();
        var id = db.uuid4(), moduleId = db.uuid4();

        db().put(dripType.unserialize({ id: moduleId, type: 'image-hero-module' }));
        db().put(dripType.unserialize({ id: id, type: 'work-page', modules: [ moduleId ] }));

        var cat = this.props.node.categories.load()[category], items = cat.items.serialize();
        items.push(id);
        cat.items.unserialize(items);
        cat.save();
        this.forceUpdate();
    },
    _addCat: function (ev) {
        ev.preventDefault();

        var id = db.uuid4();
        db().put(dripType.unserialize({ id: id, type: 'work-category', items: [] }));

        var items = this.props.node.categories.serialize();
        items.push(id);
        this.props.node.categories.unserialize(items);
        this.props.node.save();
        this.forceUpdate();
    },
    render: function () {
        var categories = this.props.node.categories.load();
        var cats = categories.map(function (category) {
            return <li className="work-overview--category">
                <a>{ category.name.render() }</a>
            </li>;
        });

        var cat_items = [], i = 0, self = this;
        categories.forEach(function (category, category_idx) {
            var itemNodes = category.items.load().slice(), itemNodeCount = itemNodes.length, items = [];

            function renderItem(k, item) {
                var current = i++, controls = [];
                if (current > 0) {
                    controls.push(<div onClick={ self._prev.bind(self, current) } className="module-edit--control module-edit--up">&#8593;</div>);
                }
                if (category_idx < categories.length - 1 || itemNodes.length > 0) {
                    controls.push(<div onClick={ self._next.bind(self, current) } className="module-edit--control module-edit--down">&#8595;</div>);
                }
                controls.push(<a href={ '#' + item.editUrl() } className="module-edit--control module-edit--edit">e</a>);

                return <div className={ k + " module-wrapper" }>
                    <div className="work-category--edit-tools module-edit">{ controls }</div>
					{ item.render('overview-edit') }
                </div>;
            }

            if (itemNodes.length) {
                var item = itemNodes.shift();
                items.push(renderItem('work-category--item-first', item));
            }
            while (itemNodes.length) {
                if (itemNodes.length == 1) {
                    items.push(<div className="work-category--items">
						{ renderItem("work-category--item-left", itemNodes.shift()) }
                        <div className="work-category--item-right-empty">
                            <div className="work-category--add" onClick={ self._add.bind(self, category_idx) }>+</div>
                        </div>
                    </div>);
                }
                else {
                    items.push(<div className="work-category--items">
						{ renderItem("work-category--item-left", itemNodes.shift()) }
						{ renderItem("work-category--item-right", itemNodes.shift()) }
                    </div>);
                }
            }
            if (!itemNodeCount || (itemNodeCount % 2) == 1) {
                items.push(<div className="work-category--item-full-empty" onClick={ self._add.bind(self, category_idx) }>
                    <div className="work-category--add">+</div>
                </div>);
            }
            cat_items.push(<div className="work-category">
                <div className="work-category--name">{ category.name.render('edit', { onChange: self._change.bind(self, category, 'name') }) }</div>
				{ items }
            </div>);
        });


        return <div>
			{ this.props.hero.render('edit') }
            <div className="work-overview--categories">
                <ul>{ cats }</ul>
            </div>
			{ cat_items }
            <a className="btn btn-primary work-category-add-category" href="#" onClick={ self._addCat }>+ New category</a>
        </div>;
    }
});

module.exports = NodeWorkOverview;
