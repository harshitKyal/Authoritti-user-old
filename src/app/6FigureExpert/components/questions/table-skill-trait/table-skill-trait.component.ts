import {Component, Input, OnInit} from '@angular/core';
import {Base} from "../../../../base/Base";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ArrowToastService} from "../../../../Arrow/services/toast/arrow-toast.service";


@Component({
     selector   : 'comp-table-skill-trait',
     templateUrl: './table-skill-trait.component.html',
     styleUrls  : ['./table-skill-trait.component.scss'],
})
export class TableSkillTraitComponent extends Base implements OnInit
{
     @Input('data') question:VOQuestion;

     private count:any = {
          skill: 0,
          trait: 0,
     };
     // test:boolean;






     constructor(private toastService:ArrowToastService)
     {
          super();
     }





     ngOnInit()
     {
          // this.test=false;
          // this.question.table_skill_trait.skillRows.length=3;
     }





     public onChange(checked:boolean, item:any, index:number, field:string):void
     {
          // console.log(checked);
          // console.log(item);
          // console.log(index);
          //
          // if (!checked)
          // {
          //      item.is_top_ten = false;
          //      return;
          // }
          // if (index == 2)
          // {
          //      item.is_top_ten = false;
          //      return;
          // }

          // if (!checked)
          // {
          //      return;
          // }
          // item.is_top_ten = false;
          // return;




          item.is_top_ten = checked;
          if (!checked)
          {
               return;
          }


          this.count[field] = 0;
          let rows = (field == "skill")
                  ? this.question.table_skill_trait.skillRows
                  : this.question.table_skill_trait.traitRows;


          for (let itemRow of rows)
          {
               if (itemRow.is_top_ten)
               {
                    this.count[field] += 1;
               }
          }


          if (checked && this.count[field] > 10)
          {
               for (let i = 0; i < rows.length; i++)
               {
                    let itemRow = rows[i];


                    // skip itself
                    if (i != index && itemRow.is_top_ten)
                    {
                         itemRow.is_top_ten = false;
                         break;
                    }
               }


               this.toastService.showError(`Only 10 ${field == "skill" ? "Skills" : "Traits"} are allowed.`);
               return;
          }
     }
}
