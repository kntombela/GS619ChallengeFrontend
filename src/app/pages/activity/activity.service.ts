import { MessagesService } from './../../components/messages/messages.service';
import { Injectable } from '@angular/core';
import { ENV } from 'src/app/core/env.config';
import { HttpClient } from '@angular/common/http';
import { Activity } from './activity';
import { tap, catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private baseUrl: string = `${ENV.BASE_API}`;
  private accessPointUrl: string = this.baseUrl + '/activities';

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) { }

  /** GET: Get User Activities*/
  get(userId: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl + '/users/' + userId + '/activities')
      .pipe(
        retry(3),
        catchError(this.handleError('getActivities', []))
      );
  }

  /** GET: Get single activity*/
  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(this.accessPointUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Activity>('getActivity'))
      );
  }

  /** PUT: */
  update(activity: Activity): Observable<any> {
    return this.http.put(this.accessPointUrl + '/' + activity.id, activity)
      .pipe(
        tap(_ => this.log(`updated activity id=${activity.id}`, true)),
        catchError(this.handleError<any>('updateActivity'))
      );
  }

  /** POST: */
  add(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.accessPointUrl, activity).pipe(
      tap((activity: Activity) => this.log('New activity added!', true)),
      catchError(this.handleError<Activity>('addActivity'))
    );
  }

  /** POST: */
  delete(id: number): Observable<any> {
    return this.http.delete<number>(this.accessPointUrl + '/' + id).pipe(
      tap(_ => this.log('Activity deleted!', true)),
      catchError(this.handleError<Activity>('deleteActivity'))
    );
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
