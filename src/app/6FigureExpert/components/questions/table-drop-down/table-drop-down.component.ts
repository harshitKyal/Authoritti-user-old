import {Component, Input, OnInit} from '@angular/core';
import {Base} from "../../../../base/Base";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {TableDropDown, VOTableDropDown} from '../../../../vo/VOTableDropDown';
import {PageService} from '../../../services/page.service';


@Component({
     selector   : 'comp-table-drop-down',
     templateUrl: './table-drop-down.component.html',
     styleUrls  : ['./table-drop-down.component.scss'],
})
export class TableDropDownComponent extends Base implements OnInit
{
     @Input('data') question: VOQuestion;





     constructor(public pageService: PageService)
     {
          super();
     }





     ngOnInit()
     {
     }





     public onChange(rowId: string, answer: string, rows: TableDropDown[]): void
     {
          if (this.pageService.currentPage.auid == "61d7a6fe-aa84-ad6d-494f-69992ad8e469")
          {
               if (!answer)
               {
                    return;
               }


               for (let itemRow of rows)
               {
                    if (rowId != itemRow.auid && itemRow.answer == answer)
                    {
                         itemRow.answer = null;
                    }
               }
          }
     }
}
