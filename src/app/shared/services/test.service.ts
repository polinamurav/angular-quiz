import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {QuizListType} from "../../../types/quiz-list.type";
import {TestResultType} from "../../../types/test-result.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {QuizType} from "../../../types/quiz.type";
import {UserResultType} from "../../../types/user-result.type";
import {PassTestResponseType} from "../../../types/pass-test-response.type";
import {ResultTestResponse} from "../../../types/result-test-response";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTests(): Observable<QuizListType[]> {
    return this.http.get<QuizListType[]>(environment.apiHost + 'tests');
  }

  getUserResults(userId: number): Observable<DefaultResponseType | TestResultType[]> {
    return this.http.get<DefaultResponseType | TestResultType[]>(environment.apiHost + 'tests/results?userId=' + userId);
  }

  getQuiz(id: number | string): Observable<DefaultResponseType | QuizType> {
    return this.http.get<DefaultResponseType | QuizType>(environment.apiHost + 'tests/' + id);
  }

    getQuizResults(id: number | string, userId: string | number): Observable<DefaultResponseType | QuizType> {
    return this.http.get<DefaultResponseType | QuizType>(environment.apiHost + 'tests/' + id + '/result/details/?userId=' + userId);
  }

  passQuiz(id: number | string, userId: string | number, userResult: UserResultType[]): Observable<DefaultResponseType | PassTestResponseType> {
    return this.http.post<DefaultResponseType | PassTestResponseType>(environment.apiHost + 'tests/' + id + '/pass', {
      userId: userId,
      results: userResult
    });
  }

  getResult(id: number | string, userId: string | number): Observable<DefaultResponseType | PassTestResponseType> {
    return this.http.get<DefaultResponseType | PassTestResponseType>(environment.apiHost + 'tests/' + id + '/result?userId=' + userId);
  }
}
