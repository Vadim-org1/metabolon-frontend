import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import {Messwerte} from './messwerte';

@Injectable({
  providedIn: 'root'
})
export class MesswerteService {

  constructor(private http: HttpClient) { }

  private static graph1URL = 'http://localhost:8080/rest/graph1.php';

  getForGraph1(): Observable<Messwerte[]> {
    return this.http.get<Messwerte[]>(MesswerteService.graph1URL)
      .pipe(catchError(this.handleError<Messwerte[]>('get first graph data', [])));
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

      /*      // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
       */

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
