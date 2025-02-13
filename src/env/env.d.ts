declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      PORT_CLIENT?: number
    }
  }
}
