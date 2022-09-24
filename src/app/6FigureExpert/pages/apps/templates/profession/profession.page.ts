import {Component} from '@angular/core';
import {BasePageCustom} from "../../../../base/BasePageCustom";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../services/page.service";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {VOProfession} from "./vo/VOProfession";
import {VOPage} from "../../../../../vo/VOPage";
import {UUID} from "angular2-uuid";
import {ToastController} from "@ionic/angular";


@Component({
     selector   : 'app-profession',
     templateUrl: './profession.page.html',
     styleUrls  : ['./profession.page.scss'],
})
export class ProfessionPage extends BasePageCustom
{
     public inputYear:string;
     public inputCompany:string;
     public inputJob:string;
     public inputDuration:string;

     public editId:number = null;

     public professions:VOProfession[];





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


          this.professions = this.page.template.data
                  .map((item) => {
                       return {...item};
                  });
     }





     reset()
     {
          super.reset();


          this.inputYear = null;
          this.inputCompany = null;
          this.inputJob = null;
          this.inputDuration = null;


          this.editId = null;
     }





     public addProfession():void
     {
          let year:string = this.inputYear;
          let company:string = this.inputCompany && this.inputCompany.trim();
          let job:string = this.inputJob && this.inputJob.trim();
          let duration:string = this.inputDuration;


          if (!year || !company || !job || !duration)
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
               let profession = this.professions[this.editId];
               profession.year = year;
               profession.company = company;
               profession.job = job;
               profession.duration = duration;


               this.editId = null;
          }
          else
          {
               let item = new VOProfession({
                    id      : UUID.UUID(),
                    year    : year,
                    company : company,
                    job     : job,
                    duration: duration
               });
               this.professions.push(item);
          }


          this.reset();
     }





     public editProfession(index:number, item:VOProfession):void
     {
          this.inputYear = item.year;
          this.inputCompany = item.company;
          this.inputJob = item.job;
          this.inputDuration = item.duration;


          this.editId = index;
     }





     public removeProfession(index:number):void
     {
          this.professions.splice(index, 1);


          this.reset();
     }





     onNext(submit?:boolean)
     {
          this.professions.forEach((item, index) => item.count = `Job #${index + 1}`);
          this.page.template.data = this.professions;


          // remove existing, so newPages can be added
          this.backendService.pages = this.backendService.pages.filter((item) => {
               return !item.auid.includes("professional_skill") && !item.auid.includes("professional_trait");
          });
          let otherPages = [];
          let pageSkill = this.backendService.skillPagesForCopy[0];
          let pageTrait = this.backendService.skillPagesForCopy[1];


          for (let profession of this.professions)
          {
               let newPageSkill:VOPage = new VOPage(pageSkill);
               newPageSkill.auid = `professional_skill_${profession.id}`;
               newPageSkill.questionnaire.extraTitle = `${profession.count} - ${profession.job}/${profession.company} | Year ${profession.year}`;


               let newPageTrait:VOPage = new VOPage(pageTrait);
               newPageTrait.auid = `professional_trait_${profession.id}`;
               newPageTrait.questionnaire.extraTitle = `${profession.count} - ${profession.job}/${profession.company} | Year ${profession.year}`;


               otherPages.push(newPageSkill);
               otherPages.push(newPageTrait);
          }


          let i = this.backendService.pages.findIndex((page) => page.auid == "profession") + 1;
          this.backendService.pages.splice(i, 0, ...otherPages);
          this.backendService.pagesCount = this.backendService.pages.length - 1; // remove report count


          super.onNext(submit);
     }
}
