import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOPage} from "../../../../vo/VOPage";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {VOIntro} from "../../../../vo/VOIntro";


@Component({
     selector   : 'comp-intro',
     templateUrl: './intro.component.html',
     styleUrls  : ['./intro.component.scss'],
})
export class IntroComponent extends BaseAddEditForm implements OnInit
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
          let intro:VOIntro = this.page.intro || new VOIntro();


          this.formAddEdit = this.formBuilder.group({
               title          : [intro.title, Validators.required],
               description    : [intro.description],
               video_link     : [intro.video_link],
               show_intro_icon: [intro.show_intro_icon],
          });
     }





     onSubmit(value?:any):void
     {
          let page:VOPage = new VOPage(this.page);
          page.intro = value;


          this.eventSave.emit(page);
     }
}
