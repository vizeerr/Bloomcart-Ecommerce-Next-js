import mongoose, { Document, Schema } from "mongoose";

export interface ProductInterface extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    onSale: boolean;
    priceDrop?: number; // Optional field
    colors: string; // Assuming colors are strings
    imageUrl: string;
    reviews?: number; // Optional field
    inventory:number;
}

const ProductSchema: Schema<ProductInterface> = new Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    description: {
        type: String,
        required: [true, "Provide description"],
    },
    price: {
        type: Number,
        required: [true, "Provide Price"],
    },
    category: {
        type: String,
        required: [true, "Provide Category"],
    },
    brand: {
        type: String,
        required: [true, "Provide Brand"],
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    priceDrop: {
        type: Number,
        required: false, // Optional field, so not required
    },
    imageUrl: {
        type: String,
        required: [true, "Provide Image Url"],
    },
    colors: {
        type: String, // Array of strings for colors
        required: [true, "Provide Color"],
    },
    reviews: {
        type: Number, // Assuming reviews count is a number
        required: [false, "Provide reviews"],
        default:0,
    },
    inventory: {
        type: Number, // Assuming reviews count is a number
        required: [true, "Provide inventory"],
    },
});

const Product = mongoose.models.Product as mongoose.Model<ProductInterface> ||
    mongoose.model<ProductInterface>("Product", ProductSchema);

export default Product;
