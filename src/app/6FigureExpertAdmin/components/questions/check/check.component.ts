import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOCheck} from "../../../../vo/VOCheck";
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {UUID} from "angular2-uuid";


@Component({
     selector   : 'comp-check',
     templateUrl: './check.component.html',
     styleUrls  : ['./check.component.scss'],
})
export class CheckComponent extends BaseAddEditForm implements OnInit
{
     @Input('data') question:VOQuestion;

     @Output() eventSave:EventEmitter<any> = new EventEmitter();

     public options:any[];





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
          let check:VOCheck = this.question.check || new VOCheck();
          this.options = check.options.concat();


          this.formAddEdit = this.formBuilder.group({
               title      : [this.question.title, Validators.required],
               description: [this.question.description],
               check      : this.formBuilder.group({
                    max_answer_count: [check.max_answer_count, Validators.required],
                    divide_in_groups: [check.divide_in_groups],
               })
          });
     }





     public onAddOption(value:any):void
     {
          this.options.push({auid: UUID.UUID(), name: value.trim()});
     }





     public onRemoveOption(index:number):void
     {
          this.options.splice(index, 1);
     }





     onSubmit(value?:any):void
     {
          value.check.options = this.options;


          let question:VOQuestion = new VOQuestion({...this.question, ...value});


          this.eventSave.emit(question);
     }
}
