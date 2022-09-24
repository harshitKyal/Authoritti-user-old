import {Component} from '@angular/core';
import {BaseReport} from "../../base/BaseReport";
import {BackendService} from "../../../../../services/backend.service";
import {EnumDynamicQuestion, EnumTemplate, EnumType} from "../../../../../enums/Enums";


@Component({
     selector   : 'comp-skills',
     templateUrl: './skills.component.html',
     styleUrls  : ['./skills.component.scss'],
})
export class SkillsComponent extends BaseReport
{
     constructor(backendService:BackendService)
     {
          super(backendService);
     }





     HTML():string
     {
          let html:string = super.HTML();
          let code:string = "";


          for (let itemReport of this.report.items)
          {
               switch (itemReport.type)
               {
                       // category
                    case EnumType.Category:
                    {
                         code += `
<table style="width:100%">
<tr>
<td style="font-family: Verdana; text-align: center; font-size:14px; padding-top:8px; width: 50%;">${itemReport.key}</td>
<td style="font-family: Verdana; text-align: center; font-size:14px; padding-top:8px; width: 50%;">${itemReport.value}</td>
</tr>
</table>
`;
                         break;
                    }


                       // group
                    case EnumType.Group:
                    {
                         code += `<table style="width:100%">`;
                         code += `<tr><td style="font-family: Verdana; text-align: center"><h2 style="margin: 16px 0 0">${itemReport.key}</h2></td></tr>`;
                         code += `<tr><td><div style="height: 24px"></div></td></tr>`;
                         code += `</table>`;
                         break;
                    }


                       // tableSkillTrait
                    case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
                    {
                         for (let i:number = 0; i < itemReport.value.length; ++i)
                         {
                              let itemValue = itemReport.value[i];


                              if (itemValue.type == EnumDynamicQuestion.TABLE_SKILL)
                              {
                                   code += `<table style="width:100%">`;
                              }
                              else
                              {
                                   code += `</table><table style="width:100%">`;
                              }


                              // columns
                              code += `<tr>`;
                              for (let i:number = 0; i < itemValue.key.length; ++i)
                              {
                                   code += `<td style="font-family: Verdana;"><h4 style="margin: 0 0 16px; text-align: center">${itemValue.key[i]}</h4></td>`;
                              }
                              code += `</tr>`;


                              // values
                              for (let i:number = 0; i < itemValue.value.length; ++i)
                              {
                                   let item = itemValue.value[i];

                                   code += "<tr>";
                                   for (let i:number = 0; i < item.length; ++i)
                                   {
                                        code += `<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px;">${item[i]}</td>`;
                                   }
                                   code += "</tr>";
                              }
                              code += `<tr><td><div style="height: 36px"></div></td></tr>`;
                         }

                         code += `</table>`;
                         break;
                    }


                       // goals
                    case EnumTemplate.GOALS:
                    {
                         code += `</table>`;

                         for (let i:number = 0; i < itemReport.value.length; ++i)
                         {
                              let itemGoal = itemReport.value[i];


                              // new table
                              code += `<table style="width:100%">`;


                              // goal
                              code += `<tr><td><h4 style="font-family: Verdana; margin: 0 0 16px;">Goal: ${itemGoal.name}</h4></td></tr>`;


                              // steps
                              for (let i:number = 0; i < itemGoal.steps.length; ++i)
                              {
                                   let itemStep = itemGoal.steps[i];

                                   code += `<tr><td><p style="font-family: Verdana; font-size:12px; margin: 0 16px; text-transform: capitalize">${itemStep.type}</p></td></tr>`;
                                   code += `<tr><td><p style="font-family: Verdana; font-size:16px; margin: 0 16px;">${itemStep.name}</p></td></tr>`;
                                   code += `<tr><td><p style="font-family: Verdana; font-size:12px; margin: 0 0 0 32px;">${itemStep.description || ''}</p></td></tr>`;


                                   // not last step
                                   if (i != itemGoal.steps.length - 1)
                                   {
                                        code += `<tr><td><p style="margin: 0; height: 24px"></p></td></tr>`;
                                   }
                              }


                              code += `<tr><td><div style="height: 36px"></div></td></tr>`;
                              code += `</table>`;
                         }
                         break;
                    }
               }
          }


          code += `</table>`;
          code += this.getFooter();


          return html + code;
     }
}
