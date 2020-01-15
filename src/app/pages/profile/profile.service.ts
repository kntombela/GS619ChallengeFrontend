import { Injectable } from '@angular/core';
import { ENV } from 'src/app/core/env.config';
import { PROFILE_CONFIG } from './profile.config';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesService } from 'src/app/components/messages/messages.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private accessPointUrl: string = `${ENV.MGMT_API}`;
  managementAccessToken: string;
  private _manageAuthData = {
    client_id: PROFILE_CONFIG.CLIENT_ID,
    client_secret: PROFILE_CONFIG.CLIENT_SECRET,
    audience: PROFILE_CONFIG.AUDIENCE,
    grant_type: PROFILE_CONFIG.GRANT_TYPE
  }

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private messagesService: MessagesService,
  ) { }

  /** PUT: */
  update(id: string, user_metadata: any): Observable<any> {
    return this.http.patch(this.accessPointUrl + 'users/' + id, { "user_metadata": user_metadata }, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
      .pipe(
        tap(_ => this.log('Profile Updated', true)),
        catchError(this.handleError<any>('updateProfile'))
      );
  }

  /** GET: Get user by userid*/
  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.accessPointUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
      .pipe(
        tap(),
        catchError(this.handleError<any>('getUser'))
      );
  }

  getManagementAccessToken(): Observable<any> {
    return this.http.post<any>(PROFILE_CONFIG.ACCESS_POINT, this._manageAuthData)
      .pipe(
        tap(),
        catchError(this.handleError<any>('getManagementAccesstoken'))
      );
  }

  /******************** Private Helpers ********************/
  private get _authHeader(): string {
    return `Bearer ${this.managementAccessToken}`;
  }

  private log(message: string, isSuccess: boolean) {
    this.messagesService.add(`${message}`, isSuccess);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`, false);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
