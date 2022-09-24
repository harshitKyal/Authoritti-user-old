import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from '../../../../vo/VOQuestion';
import {VOQuestionnaire} from "../../../../vo/VOQuestionnaire";


@Component({
     selector   : 'comp-slider',
     templateUrl: './slider.component.html',
     styleUrls  : ['./slider.component.scss'],
})
export class SliderComponent implements OnInit
{
     @Input('questionnaire') questionnaire:VOQuestionnaire;
     @Input('data') question:VOQuestion;

     public values:number[];
     public showValues:boolean;
     public showSnaps:boolean;





     constructor()
     {
     }





     ngOnInit()
     {
          this.showValues = this.question.slider.max_value <= 15;
          this.showSnaps = this.showValues;


          this.values = Array.from({length: this.question.slider.max_value}, ((v, i) => i + 1));
          if (this.question.slider.min_value == 0)
          {
               this.values.unshift(0);
          }


          if (!this.showValues)
          {
               this.showValues = true;
               this.values = [this.question.slider.min_value, this.question.slider.max_value / 2, this.question.slider.max_value];
          }
     }
}
