/**
 * Created by OS on 3/31/15.
 */
//TODO CREATE DB AFTER
var company = require('../../info.json').company;

module.exports = exports = new CompanyInfo();

function CompanyInfo() {
    this.name = company.name;
    this.fullName = company.fullName;
    this.phone1 = company.phone1;
    this.phone2 = company.phone2;
    this.email = company.email;
    this.address = company.address;
    this.since = company.since;
}

/**
 *
 * @param page
 * @returns {*}
 */
CompanyInfo.prototype.getTitle = function (page) {
    switch (page) {
        case '':
        case 'home':
            return 'Home | ' + company.title;
        case 'work':
            return 'Work | ' + company.title;
        case 'about':
            return 'About | ' + company.title;
    }
    return company.title;
}