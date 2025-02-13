// export class authService {
//   static handleRefreshToken = async ({ keyStore, user, refreshToken }) => {
//     const { userId, email } = user

//     if (keyStore.refreshTokensUsed.includes(refreshToken)) {
//       await KeyTokenService.deleteKeyById(userId)
//       throw new ForbidenError('Something wrong happened, please relogin!')
//     }

//     if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Shop is not registered!')

//     //check userId
//     const foundShop = await findByEmail({ email })
//     if (!foundShop) throw new AuthFailureError('Shop is not registered - found')

//     // create new pair
//     const tokens = await createTokenPair({ userId: userId, email }, keyStore.publicKey, keyStore.privateKey)

//     //update token
//     await keyStore.updateOne({
//       $set: {
//         refreshToken: tokens.refreshToken
//       },
//       $addToSet: {
//         refreshTokensUsed: refreshToken // is used to take new token
//       }
//     })
//     return { user, tokens }
//   }

//   static register = async ({ name, email, phone, password }) => {
//     try {
//       const modelUser = await Account.findOne({ email }).lean()
//       if (modelUser) throw new BadRequestError('Error: Shop already registered!')

//       const passwordHash = await bcrypt.hash(password, 10)

//       const newUser = await Account.create({
//         name,
//         email,
//         password: passwordHash,
//         phone,
//         roles: [Role.USER]
//       })

//       if (newUser) {
//         const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//           modulusLength: 2048,
//           publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
//           privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
//         })

//         console.log({ privateKey, publicKey })

//         const publicKeyString = await KeyTokenService.createKeyTokenForUser({
//           userId: newUser._id,
//           publicKey,
//           privateKey
//         })

//         if (!publicKeyString) {
//           return {
//             code: 'xxx',
//             message: 'publicKeyString error!'
//           }
//         }
//         console.log(`publicKeyString::`, publicKeyString)

//         const publicKeyObject = crypto.createPublicKey(publicKeyString)
//         console.log(`publicKeyObject::`, publicKeyObject)

//         const tokens = await createTokenPair({ userId: newUser._id, email }, publicKeyObject, privateKey)
//         console.log(`created tokens success!::`, tokens)

//         return {
//           code: 201,
//           metadata: {
//             user: getInfoData({
//               fields: ['_id', 'name', 'email'],
//               object: newUser
//             }),
//             tokens
//           }
//         }
//       }
//       return {
//         code: 200,
//         metadata: null
//       }
//     } catch (error) {
//       return {
//         code: 'xxx',
//         message: error.message,
//         status: 'error'
//       }
//     }
//   }

//   static login = async ({ email, password, refreshToken = null }) => {
//     const foundUser = await UserService.findByEmail({ email })
//     if (!foundUser) throw new BadRequestError('User not registered!')

//     const match = bcrypt.compare(password, foundUser.password)
//     if (!match) throw new AuthFailureError('Authentication error!')

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

//     const { _id: userId, roles } = foundUser
//     const tokens = await createTokenPair({ userId: userId, email }, publicKey, privateKey)

//     await KeyTokenService.createKeyTokenForUser({
//       refreshToken: tokens.refreshToken,
//       userId: userId,
//       privateKey,
//       publicKey
//     })

//     return {
//       user: getInfoData({
//         fields: ['_id', 'name', 'email', 'roles'],
//         object: foundUser
//       }),
//       tokens
//     }
//   }

//   static logout = async (keyStore) => {
//     const delKey = await KeyTokenService.removeKeyById(keyStore._id)
//     console.log({ delKey })
//     return delKey
//   }
// }
