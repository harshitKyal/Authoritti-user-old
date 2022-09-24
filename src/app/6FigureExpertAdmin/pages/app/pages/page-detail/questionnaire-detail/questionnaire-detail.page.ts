import {Component} from '@angular/core';
import {VOPage} from '../../../../../../vo/VOPage';
import {ActivatedRoute, Router} from '@angular/router';
import {EnumField, EnumRoute, EnumType} from '../../../../../../enums/Enums';
import {BaseList} from '../../../../../../base/BaseList';
import {ArrowAlertService} from '../../../../../../Arrow/services/alert/arrow-alert.service';
import {ArrowNavigationService} from '../../../../../../Arrow/services/navigation/arrow-navigation.service';
import {ArrowLoaderService} from '../../../../../../Arrow/services/loader/arrow-loader.service';
import {BackendService} from '../../../../../../services/backend.service';
import {ArrowToastService} from '../../../../../../Arrow/services/toast/arrow-toast.service';
import {untilDestroyed} from "ngx-take-until-destroy";


@Component({
     selector   : 'app-questionnaire-detail',
     templateUrl: './questionnaire-detail.page.html',
     styleUrls  : ['./questionnaire-detail.page.scss'],
})
export class QuestionnaireDetailPage extends BaseList
{
     public page: VOPage;





     constructor(router: Router,
                 route: ActivatedRoute,
                 navController: ArrowNavigationService,
                 alertService: ArrowAlertService,
                 loaderService: ArrowLoaderService,
                 backendService: BackendService,
                 toastService: ArrowToastService)
     {
          super(router, route, navController, alertService, loaderService, backendService, toastService);
     }





     ngOnInit()
     {
          super.ngOnInit();


          this.itemType = EnumType.Question;


          this.route.data
                  .pipe(untilDestroyed(this))
                  .subscribe((data) => this.page = data[EnumField.PAGE_INFO]);


          this.routeBack = `${this.navController.root}/${EnumRoute.PAGES}`;
     }





     public showDetail(questionId: string): void
     {
          if (this.userRoles && this.userRoles.can_edit)
          {
               this.navController.forwardWithUrl(EnumRoute.QUESTION_EDIT, {id: questionId});
          }
     }
}
