import {VOBase} from "./base/VOBase";
import {EnumField, EnumPage} from "../enums/Enums";
import {VOQuestionnaire} from "./VOQuestionnaire";
import {VOIntro} from "./VOIntro";
import {VOReport} from "./VOReport";
import {VOTemplate} from "./VOTemplate";
import {VOSection} from "./VOSection";


export class VOPage extends VOBase
{
     public isShown:boolean = false;

     public intro?:VOIntro;
     public questionnaire?:VOQuestionnaire;
     public report?:VOReport;
     public template?:VOTemplate;
     public section?:VOSection;





     constructor(init?:Partial<any>)
     {
          super(init);


          if (init)
          {
               switch (this.type)
               {
                    case EnumPage.INTRO:
                         this.intro = new VOIntro(init[EnumField.INTRO]);
                         break;


                    case EnumPage.QUESTIONNAIRE:
                    case EnumPage.QUESTIONNAIRE_DYNAMIC:
                         this.questionnaire = new VOQuestionnaire(init[EnumField.QUESTIONNAIRE]);
                         break;


                    case EnumPage.REPORT:
                         this.report = new VOReport(init[EnumField.REPORT]);
                         break;


                    case EnumPage.TEMPLATE:
                         this.template = new VOTemplate(init[EnumField.TEMPLATE]);
                         break;


                    case EnumPage.SECTION:
                         this.section = new VOSection(init[EnumField.SECTION]);
                         break;
               }
          }
     }





     public reset():void
     {
          this.questionnaire.reset();
     }
}
