const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId: {type:String, required:true},
        name: {type:String, required:true},
        products:[
            {
                productId: {
                    type:String
                },
                quantity: {
                    type: Number,
                    default:1
                },
                color: {
                    type: String,
                    default:''
                }
            }
        ],

        amount:{type:Number, required:true},
        address:{type:Object},
        status:{type:String, default:'Pending'}
       
    },
    {
        timestamps:true
    }

);

module.exports = mongoose.model('Order', OrderSchema);