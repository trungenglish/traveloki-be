import { Schema, model } from 'mongoose'; // Erase if already required

import { 
  COLLECTION_APIKEY, 
  DOCUMENT_APIKEY 
} from '@/common/constants';

// Declare the Schema of the Mongo model
const apiKeySchema = new Schema({
  key:{
      type:String,
      required:true,
      unique:true
  },
  status:{
      type:Boolean,
      default:true
  },
  permissions:{
      type:[String],
      required:true,
      enum: ['0000', '1111', '2222']
  },
},{
  timestamps: true,
  collection: COLLECTION_APIKEY
});

//Export the model
export const ApiKey = model(DOCUMENT_APIKEY, apiKeySchema);
