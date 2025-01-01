import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {QuizType} from "../../../../types/quiz.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoType} from "../../../../types/user-info.type";
import {map} from "rxjs";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  quiz!: QuizType;
  userInfo!: UserInfoType | null;

  constructor(private testService: TestService, private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    if (this.userInfo) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          if (this.userInfo?.userId)
              this.testService.getQuizResults(params['id'], this.userInfo.userId)
                .pipe(
                  map((data: any) => {
                    const test = data.test;
                    return {
                      id: test.id,
                      name: test.name,
                      questions: test.questions.map((question: any) => ({
                        id: question.id,
                        question: question.question,
                        answers: question.answers.map((answer: any) => ({
                          id: answer.id,
                          answer: answer.answer,
                          correct: answer.correct,
                        })),
                      })),
                    } as QuizType | DefaultResponseType;
                  })
                )
                .subscribe(result => {
                  if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message);
                  }

                  this.quiz = result as QuizType;
                })
            }
        })
    }
  }

  backToResult(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.router.navigate(['/result'], {queryParams: {id: params['id']}});
      }
    });
  }

}
