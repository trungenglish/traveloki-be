import { IOk } from './ok'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreated extends Pick<IOk, 'message' | 'metadata'> {}
