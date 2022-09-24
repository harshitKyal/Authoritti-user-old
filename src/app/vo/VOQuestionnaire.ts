import {EnumField} from "../enums/Enums";
import {VOBase} from "./base/VOBase";
import {VOQuestion} from "./VOQuestion";


export class VOQuestionnaire extends VOBase
{
     public extraTitle:string;
     public category:string;
     public group_id:string;
     public questions:VOQuestion[] = [];
     public template:VOQuestion;
     public hide_title:boolean;
     public override_next_btn:boolean;
     public multi_column_layout:boolean;





     constructor(init?:Partial<any>)
     {
          super(init);


          if (init)
          {
               this.category = init[EnumField.CATEGORY];
               this.group_id = init[EnumField.GROUP_ID];
               this.questions = init[EnumField.QUESTIONS]
                       ? init[EnumField.QUESTIONS].map((item) => new VOQuestion(item))
                       : this.questions;
               this.template = init[EnumField.TEMPLATE];
               this.hide_title = init[EnumField.HIDE_TITLE];
               this.override_next_btn = init[EnumField.OVERRIDE_NEXT_BTN];
               this.multi_column_layout = init[EnumField.MULTI_COLUMN_LAYOUT];
          }
     }





     public reset():void
     {
          for (let question of this.questions)
          {
               question.reset();
          }
     }
}
