import {EnumField} from '../enums/Enums';


export class VOCheck
{
     public max_answer_count:number = 0;
     public options:Array<{ auid:string, name:string }> = [];
     public answers:any = {};
     public divide_in_groups:boolean;





     constructor(init?:Partial<any>)
     {
          if (init)
          {
               this.max_answer_count = +init[EnumField.MAX_ANSWER_COUNT];
               this.options = init[EnumField.OPTIONS].concat();
               this.divide_in_groups = init[EnumField.DIVIDE_IN_GROUPS];
          }
     }





     public get finalAnswer():any
     {
          return Object.entries(this.answers)
                  .filter(([key, onlyTrue]) => onlyTrue)
                  .reduce((acc, [key, value]) => {
                       acc[key] = value;
                       return acc;
                  }, {});
     }





     public set finalAnswer(value)
     {
          let answers:any[] = !value
                  ? []
                  : Object.keys(value)
                          .filter((key) => !!this.options.find((item) => item.auid == key));


          // remove keys if exceeds maxAnswerCount
          if (this.max_answer_count != 0 && answers.length > this.max_answer_count)
          {
               let removeCount:number = answers.length - this.max_answer_count;
               for (let i:number = 0; i < removeCount; ++i)
               {
                    answers.pop();
               }
          }


          this.answers = answers.reduce((acc, key) => {
               acc[key] = value[key];
               return acc;
          }, {});
     }





     public get hasAnswer():boolean
     {
          let answers:any = this.finalAnswer;
          let keys:string[] = Object.keys(answers);

          return keys.length > 0;
     }





     public reset():void
     {
          this.answers = {};
     }
}
