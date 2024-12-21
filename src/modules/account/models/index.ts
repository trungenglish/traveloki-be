import { Schema, model} from 'mongoose'; // Erase if already required

import { COLLECTION_ACCOUNT, DOCUMENT_ACCOUNT } from '@/common/constants';

// Declare the Schema of the Mongo model
const accountSchema = new Schema({
  userName:{
      type:String,
      required: [true, 'Vui long nhap ten nguoi dung'],
      trim: true,
      maxLength: 150
  },
  email:{
      type:String,
      required: [true, 'Vui long nhap email'],
      unique: true,
      trim: true
  },
  password:{
      type:String,
      required:true,
  },
  phone:{
    type:String,
  },
  status:{
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
  },
  verify: {
      type: Schema.Types.Boolean,
      default: true
  },
  roles: {
      type: Array,
      default: []
  },
  firstName: {},
  lastName: {},
  gender: {},
  dob: {},
  avatar: {},
  isEmptyPassword: { type: Boolean, default: true },
  googleId: {},
  pointerId: {},
  pointerSecretCode: {}
}, {
  timestamps: true,
  collection: COLLECTION_ACCOUNT
});

//Export the model
export const Account = model(DOCUMENT_ACCOUNT, accountSchema);
