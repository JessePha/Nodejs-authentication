import mongoose from 'mongoose'

const AddressSchema =  mongoose.Schema({
    street: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    town: {
        type: String
    },
    country: {
        type: String
    }
})

const AddressModel = mongoose.model('address', AddressSchema)

export default AddressModel

