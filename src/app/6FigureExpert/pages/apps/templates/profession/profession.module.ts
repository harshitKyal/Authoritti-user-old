import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ProfessionPage} from './profession.page';
import {RouterModule, Routes} from "@angular/router";
import {ComponentsModule} from "../../../../components/components.module";
import {ResolvePageGuard} from "../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
     {
          path     : '',
          component: ProfessionPage,
          resolve  : {page_info: ResolvePageGuard}
     }
];


@NgModule({
     imports     : [
          CommonModule,
          FormsModule,
          IonicModule,
          RouterModule.forChild(routes),
          ComponentsModule,
     ],
     declarations: [ProfessionPage]
})
export class ProfessionPageModule
{
}
