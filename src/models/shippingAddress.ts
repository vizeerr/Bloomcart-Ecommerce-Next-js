import mongoose, { Document, Schema } from "mongoose";

export interface AddressInterface extends Document {
    userId: Schema.Types.ObjectId,
    shippingAddress: {
        name: string,
        address: string,
        city: string,
        country: string,
        postalcode: number
    }[],
}

const AddressSchema: Schema<AddressInterface> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide User Id"],
        ref: 'User'
    },
    shippingAddress: [{
        name: {
            type: String,
            required: [true, "Provide User name"],
        },
        address: {
            type: String,
            required: [true, "Provide User address"],
        },
        city: {
            type: String,
            required: [true, "Provide User City"],
        },
        country: {
            type: String,
            required: [true, "Provide User country"],
        },
        postalcode: {
            type: Number,
            required: [true, "Provide User Postal Address"],
        },
    }],
    
});

const Address = mongoose.models.Address as mongoose.Model<AddressInterface> ||
    mongoose.model<AddressInterface>("Address", AddressSchema);

export default Address;
