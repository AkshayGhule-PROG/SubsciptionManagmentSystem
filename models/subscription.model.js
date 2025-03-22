const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"], // Array for custom error message
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"], // Minimum length
        maxlength: [100, "Name must be at most 50 characters long"], // Maximum length
    },
    price:{
        type:Number,
        required:[true,'SSubscription Price is Requires'],
        min:[0,"mus be grater than  0"]
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP'],
        default:true
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        enum:['sp','en','fin','li','ne','poi','tech','others'],
        required:true
    },
    paymentMethod:{
        type:String,
        trim:true,
        required:true
    },status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },startDate: {
        type: Date,
        required
            :
            [true, "Start date is required"],
        validate
            :
            {
                validator: function (value) {
                    // Ensure startDate isn't in the past
                    return value >= new Date();
                }
                ,
                message: "Start date must be today or a future date"
            }
    }
    ,
    renewalDate: {
        type: Date,
        required
            :
            [true, "End date is required"],
        validate
            :
            {
                validator: function (value) {
                    // Ensures endDate is after startDate
                    return this.startDate ? value > this.startDate : true;
                }
                ,
                message: "End date must be after the start date"
            }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:'true',

    }
},{timestamps:true});

subscriptionSchema.pre('save', function (next) {
    const subscription = this;

    // Auto-calculate the renewal date if missing
    if (!subscription.renewalDate && subscription.startDate && subscription.frequency) {
        const frequencies = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        const daysToAdd = frequencies[subscription.frequency];
        if (daysToAdd) {
            const calculatedRenewalDate = new Date(subscription.startDate);
            calculatedRenewalDate.setDate(calculatedRenewalDate.getDate() + daysToAdd);
            subscription.renewalDate = calculatedRenewalDate;
        }
    }

    // Auto-update the status to 'expired' if the renewal date has passed
    if (subscription.renewalDate && subscription.renewalDate < new Date()) {
        subscription.status = 'expired';
    }

    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
