import { Subject } from 'rxjs'

export const AuthenticatedSubject = new Subject()
export const publishAuthenticated = (data) => AuthenticatedSubject.next(data)