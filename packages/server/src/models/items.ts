import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const items = new Schema({
    user_id: {
        type: String,
        required: 'user_id is requerid',
    },
    name: {
        type: String,
        required: 'name is requerid',
    },
    description:{
        type: String,
        required: 'description is requerid',
    }
   
});

export default mongoose.model('items', items)