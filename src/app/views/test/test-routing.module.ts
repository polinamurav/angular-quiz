import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChoiceComponent} from "./choice/choice.component";
import {TestComponent} from "./test/test.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  {path: 'choice', component: ChoiceComponent},
  {path: 'test/:id', component: TestComponent},
  {path: 'result', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
