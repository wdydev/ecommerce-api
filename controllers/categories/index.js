const controller = require('./category.controller');

module.exports = {
    getAll: (req, res) => {
        controller.getAll(req, res);
    },
    childCategories: (req, res) => {
        controller.childCategories(req, res);
    },
    add: (req, res) => {
        controller.add(req, res);
    },
    update: (req, res) => {
        controller.update(req, res);
    },
    delete: (req, res) => {
        controller.delete(req, res);
    },
    getCategory: (req, res) => {
        controller.getCategory(req, res);
    }
};
