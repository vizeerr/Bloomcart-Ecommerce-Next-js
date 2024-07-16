import mongoose, { Document, Schema } from "mongoose";

export interface OrderInterface extends Document {
    sessionId:string,
    userId: Schema.Types.ObjectId,
    orderItems: {
        quantity: number,
        product: Schema.Types.ObjectId,
    }[],
    shippingAddress: {
        name: string,
        address: string,
        city: string,
        country: string,
        postalcode: number
    },
    totalPrice: number,
    isPaid: boolean,
    paidAt: Date,
    isProcessing: boolean,
}

const OrderSchema: Schema<OrderInterface> = new Schema({
    sessionId:{
        type:String,
        required: [true, "Provide Payment Session Id"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide User Id"],
        ref: 'User'
    },
    orderItems: [{
        quantity: {
            type: Number,
            required: [true, "Provide Product Quantity"],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Provide Product Id"],
            ref: 'Product'
        },
    }],
    shippingAddress: {
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
    },
    totalPrice: {
        type: Number,
        required: [true, "Provide Total Price"],
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isProcessing: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Order = mongoose.models.Order as mongoose.Model<OrderInterface> ||
    mongoose.model<OrderInterface>("Order", OrderSchema);

export default Order;
