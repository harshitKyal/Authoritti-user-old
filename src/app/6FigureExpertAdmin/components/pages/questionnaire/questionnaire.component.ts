import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VOPage} from "../../../../vo/VOPage";
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {VOQuestionnaire} from "../../../../vo/VOQuestionnaire";


@Component({
     selector   : 'comp-questionnaire',
     templateUrl: './questionnaire.component.html',
     styleUrls  : ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent extends BaseAddEditForm implements OnInit
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
          let questionnaire:VOQuestionnaire = this.page.questionnaire || new VOQuestionnaire();


          this.formAddEdit = this.formBuilder.group({
               title              : [questionnaire.title, Validators.required],
               description        : [questionnaire.description],
               category           : [questionnaire.category],
               group_id           : [questionnaire.group_id],
               questions          : [questionnaire.questions],
               hide_title         : [questionnaire.hide_title],
               multi_column_layout: [questionnaire.multi_column_layout],
               override_next_btn  : [questionnaire.override_next_btn],
          });
     }





     onSubmit(value?:any):void
     {
          let page:VOPage = new VOPage(this.page);
          page.questionnaire = value;


          this.eventSave.emit(page);
     }
}
