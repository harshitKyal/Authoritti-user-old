import {Component} from '@angular/core';
import {BasePageCustom} from "../../../../base/BasePageCustom";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../services/page.service";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {UUID} from "angular2-uuid";
import {VOPage} from "../../../../../vo/VOPage";
import {VOPassion} from "./vo/VOPassion";
import {ToastController} from "@ionic/angular";


@Component({
     selector   : 'app-passion',
     templateUrl: './passion.page.html',
     styleUrls  : ['./passion.page.scss'],
})
export class PassionPage extends BasePageCustom
{
     public inputName:string;
     public inputDescription:string;
     public inputYear:string;

     public editId:number = null;

     public passions:VOPassion[];





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService,
                 public toastController:ToastController)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     ngOnInit()
     {
          super.ngOnInit();


          this.passions = this.page.template.data
                  .map((item) => {
                       return {...item};
                  });
     }





     reset()
     {
          super.reset();


          this.inputName = null;
          this.inputDescription = null;
          this.inputYear = null;


          this.editId = null;
     }





     public addPassion():void
     {
          let name:string = this.inputName && this.inputName.trim();
          let description:string = this.inputDescription && this.inputDescription.trim();
          let year:string = this.inputYear;


          if (!name || !description || !year)
          {
               this.toastController
                       .create({
                            message : 'Please complete all fields.',
                            duration: 2000,
                       })
                       .then((value) => value.present());
               return;
          }


          if (this.editId != null)
          {
               let passion = this.passions[this.editId];
               passion.name = name;
               passion.description = description;
               passion.year = year;


               this.editId = null;
          }
          else
          {
               let item = new VOPassion({
                    id         : UUID.UUID(),
                    name       : name,
                    description: description,
                    year       : year,
               });
               this.passions.push(item);
          }


          this.reset();
     }





     public editPassion(index:number, item:VOPassion):void
     {
          this.inputName = item.name;
          this.inputDescription = item.description;
          this.inputYear = item.year;


          this.editId = index;
     }





     public removePassion(index:number):void
     {
          this.passions.splice(index, 1);


          this.reset();
     }





     onNext(submit?:boolean)
     {
          this.passions.forEach((item, index) => item.count = `Passion ${index + 1}`);
          this.page.template.data = this.passions;


          // remove existing, so newPages can be added
          this.backendService.pages = this.backendService.pages.filter((item) => {
               return !item.auid.includes("personal_skill") && !item.auid.includes("personal_trait")
          });
          let otherPages = [];
          let pageSkill = this.backendService.skillPagesForCopy[0];
          let pageTrait = this.backendService.skillPagesForCopy[1];


          for (let passion of this.passions)
          {
               let newPageSkill:VOPage = new VOPage(pageSkill);
               newPageSkill.auid = `personal_skill_${passion.id}`;
               newPageSkill.questionnaire.title = `${passion.name} - What Skills Have You Learned From This Hobby ?`;
               newPageSkill.questionnaire.description = null;


               let newPageTrait:VOPage = new VOPage(pageTrait);
               newPageTrait.auid = `personal_trait_${passion.id}`;
               newPageTrait.questionnaire.title = `${passion.name} - What Traits Does This Hobby Trigger Inside of You ?`;
               newPageTrait.questionnaire.description = null;


               otherPages.push(newPageSkill);
               otherPages.push(newPageTrait);
          }


          let i = this.backendService.pages.findIndex((page) => page.auid == "passion") + 1;
          this.backendService.pages.splice(i, 0, ...otherPages);
          this.backendService.pagesCount = this.backendService.pages.length - 1; // remove report count


          super.onNext(submit);
     }
}
