import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from '../../../../vo/VOQuestion';
import {Base} from '../../../../base/Base';


@Component({
     selector   : 'comp-check',
     templateUrl: './check.component.html',
     styleUrls  : ['./check.component.scss'],
})
export class CheckComponent extends Base implements OnInit
{
     @Input('data') question:VOQuestion;

     private keys:string[] = [];





     constructor()
     {
          super();
     }





     ngOnInit()
     {
          this.keys = Object.keys(this.question.check.answers);
     }





     public onChange(detail:any):void
     {
          this.question.check.answers[detail.value] = detail.checked;


          // only needed when there's MaxLimit
          if (this.question.check.max_answer_count)
          {
               if (detail.checked)
               {
                    this.keys.push(detail.value);
               }
               else
               {
                    let index:number = this.keys.findIndex((item) => item == detail.value);
                    this.keys.splice(index, 1);
               }


               if (this.keys.length > this.question.check.max_answer_count)
               {
                    let key:string = this.keys[0];
                    this.question.check.answers[key] = false;
               }
          }
     }
}
