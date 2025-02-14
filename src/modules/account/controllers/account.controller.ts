// import { Request, Response } from 'express'

// import { authService } from '../services'

// import { CREATED, SuccessResponse } from '@/common/core'
// import { IRequestHandlerRefreshToken, IRequestLogout } from '../interfaces'

// class AuthController {
//   //region JWT
//   register = async (req: Request, res: Response) => {
//     new CREATED({
//       message: 'Register OK!',
//       metadata: await authService.register(req.body),
//       option: {}
//     }).send(res)
//   }

//   login = async (req: Request, res: Response) => {
//     new SuccessResponse({
//       metadata: await authService.login(req.body)
//     }).send(res)
//   }

//   logout = async (req: IRequestLogout, res: Response) => {
//     const { keyStore } = req
//     new SuccessResponse({
//       message: 'Logout success!',
//       metadata: await authService.logout(keyStore)
//     }).send(res)
//   }

//   handlerRefreshToken = async (req: IRequestHandlerRefreshToken, res: Response) => {
//     const { refreshToken, user, keyStore } = req
//     new SuccessResponse({
//       message: 'Get token success!',
//       metadata: await authService.handleRefreshToken({
//         refreshToken: refreshToken,
//         user: user,
//         keyStore: keyStore
//       })
//     }).send(res)
//   }
// }

// export const authController = new AuthController()
