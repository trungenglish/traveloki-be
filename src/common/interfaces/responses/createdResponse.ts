import { OkResponse } from './okResponse'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreatedResponse extends Pick<OkResponse, 'message' | 'res' | 'headers' | 'metadata'> {}
