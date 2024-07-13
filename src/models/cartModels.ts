import mongoose, { Document, Schema } from "mongoose";

export interface CartInterface extends Document {
    userId:Schema.Types.ObjectId,
    productId:Schema.Types.ObjectId,
    quantity:number,
}

const CartSchema: Schema<CartInterface> = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide User Id"],
        ref:'User'
    },
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide Product Id"],
        ref:'Product'
    },
    quantity : {
        type: Number,
        required: [true, "Provide quantity"],
    }
},{timestamps:true});

const Cart = mongoose.models.Cart as mongoose.Model<CartInterface> ||
    mongoose.model<CartInterface>("Cart", CartSchema);

export default Cart;
