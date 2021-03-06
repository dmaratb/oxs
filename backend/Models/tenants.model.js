const { mongoose } = require('./dal');
const Tenant = mongoose.model('Tenant', {
    name: String,
    phone: String,
    address: String,
    debt: Number
});


/** tenants model */
const Tenants = {
    /** add new, returns id */
    add: async ({ name, phone, address, debt = 0 }) => {
        // validations
        if (!name || !phone || !address) throw { status: 400, message: 'at least one field missing' };

        const added = new Tenant({ name: name, phone: phone, address: address, debt: debt });
        const res = await added.save();
        return res.id;
    },

    /** lists all existing */
    getAll: async () => {
        return await Tenant.find({});
    },

    /** updates one with provided id */
    update: async ({ id, name, phone, address, debt = 0 }) => {
        // validations, better option would be updating only desired fields instead of overwriting whole document
        if (!id || !name || !phone || !address) throw { status: 400, message: 'at least one field missing' };

        const result = await Tenant.updateOne({ _id: id }, { name: name, phone: phone, address: address, debt: debt });
        if (result.modifiedCount > 0) return;

        throw { status: 404, message: 'tenant not found' };
    },

    /** deletes one with provided id */
    delete: async (id) => {
        // validations
        if (!id) throw { status: 400, message: 'id is missing' };

        const result = await Tenant.deleteOne({ _id: id });
        if (result.deletedCount > 0) return;

        throw { status: 404, message: 'tenant not found' };
    }
}


module.exports.Tenants = Tenants;