import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Message } from "../models";
import { throwError, Observable } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksHelperService {

  constructor(private http: HttpClient) { }

  /**
   * Method to generate the random userId.
   * 
   * @returns number
   * 
   */
  getRandomUserId(min: number, max: number): number {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === 0) ? this.getRandomUserId(min, max) : num
  }
  
  /**
   * Method is used for fetching the user as per the generated random id.
   * 
   * Here, we're using the 3rd party API for fetching the user details
   * and this api have some constraints like it only have 10 users and thus have 
   * 10 Ids and therefore, we're generating the randomId from 1 to 10.
   * 
   * @returns Observable<User>
   * 
   */
  getUser(): Observable<User> {
    return this.http.get<User>('https://reqres.in/api/users/' + this.getRandomUserId(1, 10))
    .pipe(
      map((response) => response['data']), 
      catchError((error) => {
        console.error('Error while fetching the user', error);
        return throwError('Something went wrong!');
      }  
    )
   )
  }

  /**
   * Method is used for fetching the messages.
   * 
   * In this method, Instead of real API, we're fetching the dummy messages data 
   * from the 'assets/messages.json' and we have added 500ms delay to make
   * it behave as real API.
   * 
   * @returns Observable<Message[]>
   * 
   */
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('../../../../assets/messages.json')
    .pipe(
      delay(500),
      map((messages) => messages), 
      catchError((error) => {
        console.error('Error while fetching the messages', error);
        return throwError('Something went wrong!');
      }) 
    )  
  }

  /**
   * Method is used for converting the input string into the lowerCase.
   * 
   * @param input {string}
   * 
   * @returns string
   * 
   */
  convertTextToLowerCase(input: string): string {
    return input && input.trim() && input.toLocaleLowerCase();
  }
}
