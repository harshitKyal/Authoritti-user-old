import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOPage} from "../../../../vo/VOPage";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOSection} from "../../../../vo/VOSection";


@Component({
     selector   : 'comp-section',
     templateUrl: './section.component.html',
     styleUrls  : ['./section.component.scss'],
})
export class SectionComponent extends BaseAddEditForm implements OnInit
{
     @Input('data') page:VOPage;

     @Output() eventSave:EventEmitter<any> = new EventEmitter();





     constructor(router:Router,
                 route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 alertService:ArrowAlertService,
                 loaderService:ArrowLoaderService,
                 backendService:BackendService,
                 formBuilder:FormBuilder)
     {
          super(router, route, navController, alertService, loaderService, backendService, formBuilder);
     }





     ngOnInit()
     {
          let section:VOSection = this.page.section || new VOSection();


          this.formAddEdit = this.formBuilder.group({
               title: [section.title, Validators.required],
          });
     }





     onSubmit(value?:any):void
     {
          let page:VOPage = new VOPage(this.page);
          page.section = value;


          this.eventSave.emit(page);
     }
}
