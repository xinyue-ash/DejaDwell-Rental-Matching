const TenantPreference = require('../models/TenantPreferenceSchema');

const tenantPrefQueries = {
    editTenantPref: async function (preferenceID, data) {
        try {

            const newTenantPref = await TenantPreference.findOneAndUpdate({ preferenceID }, data, { new: true });
            return newTenantPref;

        } catch (error) {
            throw new Error('Failed updating tenant preference to mongoDB' + error.messages);
        }
    },
    getOneTenantPref: async function (preferenceID) {
        try {
            return await TenantPreference.findOne({ preferenceID });
        } catch (err) {
            throw new Error('Failed to find tenant prefernece using ID, ' + err.message);
        }
    },
    getAllTenantPrefs: async function () {
        try {
            return await TenantPreference.find();
        } catch (err) {
            throw new Error('Failed to find all tenant preference, ' + err.message);
        }
    }, 
    creatTenantPref: async function (data) {
        try {
            const tenantPref = new TenantPreference(data);
            return await tenantPref.save();
        } catch (error) {
            throw new Error('Failed create tenant preference when sign up' + error.messages);
        }
        
    }

}

module.export = tenantPrefQueries;