import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IonicStorageModule} from "@ionic/storage";
import {ArrowBackendEnvironmentService} from "../Arrow/services/backends/base/arrow-backend-environment.service";
import {MyBackendEnvironmentService} from "../services/my-backend-environment.service";
import {ArrowBackendService} from "../Arrow/services/backends/base/arrow-backend.service";
import {ArrowBrainCloudService} from "../Arrow/services/backends/arrow-brain-cloud.service";
import {FormsModule} from "@angular/forms";
// import {ConnectionServiceModule, ConnectionServiceOptions, ConnectionServiceOptionsToken} from "ng-connection-service";


@NgModule({
	declarations   : [
		AppComponent
	],
	entryComponents: [],
	imports        : [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		FormsModule,
		// ConnectionServiceModule
	],
	providers      : [
		StatusBar,
		SplashScreen,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
		{
			provide    : ArrowBackendEnvironmentService,
			useExisting: MyBackendEnvironmentService,
		},
		{
			provide    : ArrowBackendService,
			useExisting: ArrowBrainCloudService,
		},
		// {
		// 	provide : ConnectionServiceOptionsToken,
		// 	useValue: <ConnectionServiceOptions>{
		// 		heartbeatInterval     : 60 * 1000,
		// 		heartbeatRetryInterval: 30 * 1000,
		// 		heartbeatUrl          : "https://build.envato.com/"
		// 	}
		// }
	],
	bootstrap      : [
		AppComponent
	]
})
export class AppModule
{
}
