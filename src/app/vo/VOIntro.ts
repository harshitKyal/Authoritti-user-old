import {EnumField} from "../enums/Enums";
import {VOBase} from "./base/VOBase";


export class VOIntro extends VOBase
{
     public video_link:string;
     public show_intro_icon:boolean = true;





     constructor(init?:Partial<any>)
     {
          super(init);


          if (init)
          {
               this.video_link = init[EnumField.VIDEO_LINK];
               this.show_intro_icon = init[EnumField.SHOW_INTRO_ICON];
          }
     }
}
