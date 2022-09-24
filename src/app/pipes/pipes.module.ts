import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {SnakeToTitleCasePipe} from "./snake-to-title.pipe";
import {NullOrEmptyPipe} from './null-or-empty.pipe';
import {TimeAgoPipe} from "time-ago-pipe";


@NgModule({
     declarations: [
          SnakeToTitleCasePipe,
          NullOrEmptyPipe,
          TimeAgoPipe
     ],
     imports     : [
          CommonModule
     ],
     exports     : [
          SnakeToTitleCasePipe,
          NullOrEmptyPipe,
          TimeAgoPipe
     ],
     providers   : [
          TitleCasePipe
     ]
})
export class PipesModule
{
}
