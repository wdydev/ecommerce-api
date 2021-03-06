const UserService = require('./user.service');

class UserController {
    constructor() {
        this.service = new UserService();
    }

    //CRUD User
    async getUsers(req, res) {
        try {
            const users = await this.service.getUsers();
            res.json({status: 200, users: users || []});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async getUser(req, res) {
        try {
            const user = await this.service.getUser(req.params.id);
            res.json({status: 200, user: user});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async addUser(req, res) {
        try {
            const user = await this.service.addUser(req.body);
            res.json({status: 200, user});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async updateUser(req, res) {
        try {
            const user = await this.service.updateUser(req.params.id, req.body);
            res.json({status: 200, user});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async changePassword(req, res) {
        try {
            const user = this.service.changePassword(req.params.id, req.body);
            res.json({status: 200, user});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await this.service.deleteUser(req.params.id);
            res.json({status: 200, user});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    //CRUD User Address
    async getAddresses(req, res) {
        try {

            const addresses = await this.service.getAddresses(req.params.uid);
            res.json({status: 200, addresses: addresses || []});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async addAddress(req, res) {
        try {
            const address = await this.service.addAddress(req.params.uid, req.body);
            res.json({status: 200, address});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async updateAddress(req, res) {
        try {
            const address = await this.service.updateAddress(req.params.uid, req.body);
            address._id = req.params.id;
            res.json({status: 200, address});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }


    async deleteAddress(req, res) {
        try {
            const deleted = await this.service.deleteAddress(req.params.uid, req.params.id);
            if (!deleted) {
                throw new Error("Address could not be deleted.")
            }
            res.json({status: 200, message: "Address deleted successfully."});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    //CRUD User Payments
    async getPayments(req, res) {
        try {
            const payments = await this.service.getPayments(req.params.uid);
            res.json({status: 200, payments: payments || []});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async addPayments(req, res) {
        try {
            const payment = await this.service.addPayement(req.params.uid, req.body);
            res.json({status: 200, card: payment || []});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async updatePayments(req, res) {
        try {
            const payment = await this.service.updatePayments(req.params.uid, req.body);
            res.json({status: 200, payment});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async deletePayments(req, res) {

        try {
            const deleted = await this.service.deletePayment(req.params.uid, req.params.id);
            if (!deleted) {
                throw new Error("Payment method could not be deleted.")
            }
            res.json({status: 200, message: "Payment method deleted successfully."});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async authenticate(req, res) {
        try {
            if (!req.body) {
                throw new Error("Data expected with this request.");
            }

            const data = req.body;
            const user = await this.service.authUser(data.email, data.password);

            delete user.password;
            res.json({status: 200, user: user})
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async getByToken(req, res) {
        try {
            if (!req.body) {
                throw new Error("Data expected with this request.");
            }

            const user = await this.service.getByToken(req.params.token);
            delete user.password;
            res.json({status: 200, user: user})
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }
}

module.exports = new UserController();
