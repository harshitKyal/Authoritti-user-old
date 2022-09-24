import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SectionPage} from './section.page';
import {RouterModule, Routes} from "@angular/router";
import {ResolvePageGuard} from "../../../gaurds/resolve/resolve-page.guard";
import {ComponentsModule} from "../../../components/components.module";


const routes:Routes = [
     {
          path     : '',
          component: SectionPage,
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
     declarations: [SectionPage]
})
export class SectionPageModule
{
}
