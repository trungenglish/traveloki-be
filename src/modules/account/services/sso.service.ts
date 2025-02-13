// export class SSOService {
//   static async handleRefreshToken({ keyStore, user, refreshToken }) {
//     const { userId, email } = user

//     if (keyStore.refreshTokensUsed.includes(refreshToken)) {
//       await KeyTokenService.deleteKeyById(userId)
//       throw new ForbidenError('Something wrong happened, please relogin! - line 39')
//     }

//     if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Partner is not registered! - line 42')

//     const foundPartner = await PartnerService.findByEmail({ email })
//     if (!foundPartner) throw new AuthFailureError('Shop is not registered - line 45')

//     const tokens = await createTokenPair(
//       {
//         userId: userId,
//         email
//       },
//       keyStore.publicKey,
//       keyStore.privateKey
//     )

//     // update tokens
//     await keyStore.updateOne({
//       $set: {
//         refreshToken: tokens.refreshToken
//       },
//       $addToSet: {
//         refreshTokensUsed: refreshToken // is used to take new token
//       }
//     })

//     return {
//       user,
//       tokens
//     }
//   }
//   /**
//    * @LOQ-burh
//    * @steps
//    * @1 - check email in dbs
//    * @2 - hash password
//    * @2 - create new partner
//    * @3 - create assetToken & refreshToken and save
//    * @4 - generate token
//    * @5 - get data return login
//    * @route (update later)
//    * @param (update later)
//    * @body (update later)
//    * @returns partner
//    * @returns tokens pair: access token, refresh token
//    */
//   static async register({ name, email, password }) {
//     try {
//       // - 1
//       const existPartner = await DoiTac.findOne({ email }).lean()
//       if (existPartner) throw new BadRequestError('Error: Partner already registered! - line 85')

//       const passHash = await bcrypt.hash(password, 10)

//       const newPartner = await DoiTac.create({
//         name,
//         email,
//         password: passHash,
//         isPartner: true
//       })

//       if (newPartner) {
//         const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//           modulusLength: 2048,
//           publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
//           privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
//         })
//         console.log({ privateKey, publicKey })
//         // console.log(
//         //   publicKey.export({ type: "pkcs1", format: "pem" }),
//         //   privateKey.export({ type: "pkcs1", format: "pem" })
//         // )

//         const publicKeyString = await KeyTokenService.createKeyTokenForPartner({
//           partnerId: newPartner._id,
//           publicKey,
//           privateKey
//         })
//         if (!publicKeyString) {
//           return {
//             code: 'xxx',
//             message: 'publicKeyString error! - line 113'
//           }
//         }
//         console.log(`publicKeyString::`, publicKeyString)

//         const publicKeyObject = crypto.createPublicKey(publicKeyString)
//         console.log(`publicKeyObject::`, publicKeyObject)

//         // create tokens pair
//         const tokens = await createTokenPair({ partnerId: newPartner._id, email }, publicKeyObject, privateKey)
//         console.log(`create tokens pair success::`, tokens)

//         return {
//           code: 201,
//           metadata: {
//             partner: getInfoData({
//               fields: ['_id', 'name', 'email'],
//               object: newPartner
//             }),
//             tokens
//           }
//         }
//       }
//     } catch (error) {
//       return {
//         code: 'xxx',
//         message: error.message,
//         status: 'error'
//       }
//     }
//   }
//   /**
//    * @LOQ-burh
//    * @steps
//    * @1 - check email in dbs
//    * @2 - match password
//    * @3 - create assetToken & refreshToken and save
//    * @4 - generate token
//    * @5 - get data return login
//    * @route (update later)
//    * @param (update later)
//    * @body (update later)
//    * @returns partner
//    * @returns tokens pair: access token, refresh token
//    */
//   static async login({ email, password, refreshToken = null }) {
//     const foundPartner = await PartnerService.findByEmail({ email })
//     if (!foundPartner) throw new BadRequestError('Partner not registered!')

//     const match = bcrypt.compare(password, foundPartner.password)
//     if (!match) throw new AuthFailureError('Authen error!')

//     const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//       modulusLength: 2048,
//       publicKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem'
//       },
//       privateKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem'
//       }
//     })
//     const { _id: partnerId } = foundPartner
//     const tokens = await createTokenPair({ partnerId: partnerId, email }, publicKey, privateKey)

//     await KeyTokenService.createKeyTokenForPartner({
//       refreshToken: tokens.refreshToken,
//       partnerId: partnerId,
//       privateKey,
//       publicKey
//     })

//     return {
//       partner: getInfoData({
//         fields: ['_id', 'name', 'email'],
//         object: foundPartner
//       }),
//       tokens
//     }
//   }
//   static async loginWithPointer({ code }) {
//     console.log(`Received code::${code}`)
//     if (!code) throw new NotFoundError('Authorization code is required!')

//     try {
//       const { accessToken, user } = await getAccessToken(code) // { accessToken, email, id }
//       console.log({ accessToken, user })
//       const partner = await getUserProfile(accessToken)
//       console.log('getUserProfile::', partner)

//       // 3. check if isUser, if user isn't exist then create profile
//       const isPartner = await PartnerService.findOrCreatePartner(partner.email)

//       // 4. create token jwt
//       if (isPartner) {
//         const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//           modulusLength: 2048,
//           publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
//           privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
//         })
//         console.log({ privateKey, publicKey })

//         const publicKeyString = await KeyTokenService.createKeyTokenForPartner({
//           partnerId: isPartner._id,
//           publicKey,
//           privateKey
//         })

//         if (!publicKeyString) {
//           return {
//             code: '400',
//             message: 'Bad Request: publicKeyString error! - line 113'
//           }
//         }
//         console.log(`publicKeyString::`, publicKeyString)

//         const publicKeyObject = crypto.createPublicKey(publicKeyString)
//         console.log(`publicKeyObject::`, publicKeyObject)

//         const tokens = await createTokenPair(
//           { partnerId: isPartner._id, email: partner.email },
//           publicKeyObject,
//           privateKey
//         )
//         console.log(`create tokens pair success::`, tokens)
//       }

//       return {
//         code: 201,
//         // metadata: {
//         //   partner: getInfoData({
//         //     fields: ['_id', 'name', 'email'],
//         //     object: isPartner,
//         //   }),
//         //   tokens,
//         // },
//         partner: user,
//         tokens: accessToken,
//         partnerEmail: partner.email,
//         partnerId: partner._id
//       }
//     } catch (error) {
//       return {
//         code: '500',
//         message: error.message,
//         status: 'error'
//       }
//     }
//   }

//   static logout = async (keyStore) => {
//     const delKey = await KeyTokenService.removeKeyById(keyStore._id)
//     console.log({ delKey })
//     return delKey
//   }
// }
