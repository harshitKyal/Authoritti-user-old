import {VOReport} from "../../../../vo/VOReport";
import {AfterViewInit, EventEmitter, Input, Output} from "@angular/core";
import {BackendService} from "../../../../services/backend.service";
import {Base} from "../../../../base/Base";


export class BaseReport extends Base implements AfterViewInit
{
     _report:VOReport;





     get report()
     {
          return this._report;
     }





     @Input('report')
     set report(value)
     {
          this._report = value;
     }





     @Input() title:string;

     @Output() eventHtml = new EventEmitter<string>();

     public date:string;





     constructor(public backendService:BackendService)
     {
          super();


          let d = new Date();
          this.date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
     }





     ngAfterViewInit():void
     {
          this.eventHtml.emit(this.HTML());
     }





     public HTML():string
     {
          return `
<div style="text-align:center;">
     <img style="width: 75%; height: 75%;" src="https://www.authoritti.io/uploads/report.png">
</div>
<h3 style="font-family: Verdana; text-align:center;"><span style="margin-right: 24px">${this.backendService.signedInUser.name}</span>|<span style="margin-left: 24px">${this.date}</span></h3>
<h1 style="font-family: Verdana; text-align:center;">${this.title}</h1>
`;
     }





     public getFooter():string
     {
          return `
<footer style="margin-top: 24px;">
<p style="font-family: Verdana; text-align: center">Copyright © ${this.date} Mysticpreneur Pty Ltd</p>
</footer>
`;
     }
}
