import { Schema, model } from 'mongoose'

import { COLLECTION_KEYTOKEN, DOCUMENT_ACCOUNT, DOCUMENT_KEYTOKEN } from '@/common/constants'

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: DOCUMENT_ACCOUNT },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    refreshTokensUsed: { type: Array, default: [] },
    refreshToken: { type: String, required: true }
  },
  {
    collection: COLLECTION_KEYTOKEN,
    timestamps: true
  }
)
export const KeyToken = model(DOCUMENT_KEYTOKEN, keyTokenSchema)
