import {Injectable} from '@angular/core';
import {VOPage} from "../vo/VOPage";
import {VOCategory} from "../vo/VOCategory";
import {VOQuestion} from "../vo/VOQuestion";
import {EnumField, EnumPage, EnumReport, EnumRole, EnumRoute, EnumType} from "../enums/Enums";
import {ArrowBackendService} from "../Arrow/services/backends/base/arrow-backend.service";
import {UUID} from "angular2-uuid";
import {VOApp} from "../vo/VOApp";
import {VOUser} from "../vo/VOUser";
import {VOSession} from "../vo/VOSession";
import {VOGroup} from "../vo/VOGroup";
import {VOFinancialGoal} from "../6FigureExpert/pages/apps/custom/financial-goals/vo/VOFinancialGoal";
import {ReturnStatement} from "@angular/compiler";
import {VOProfession} from "../6FigureExpert/pages/apps/templates/profession/vo/VOProfession";


const EnumTable = {
     APPS      : 'apps',
     PAGES     : 'pages',
     CATEGORIES: 'categories',
     SESSIONS  : 'sessions',
     GROUPS    : 'groups',
     USERS     : 'users'
};

const EnumScript = {
     aDynamicDB: 'aDynamicDB',
     aDBList   : 'aDBList'
};


enum EnumMethod
{
     Create = 1,
     Update,
     Delete
}


interface Params
{
     method:EnumMethod,
     type:EnumType,
     payload:any,
     items?:any[],
     index?:number
}


interface ExtraPayload
{
     table:string;
     entityId:string;
     indexId?:string;
}


@Injectable({
     providedIn: 'root'
})
export class BackendService
{
     public appPagesSource = [
          {title: 'Home', url: EnumRoute.HOME, icon: 'home'},
          {title: 'Users', url: EnumRoute.USERS, icon: 'people'},
          {title: 'Apps', url: EnumRoute.APPS, icon: 'cube'},
     ];
     public appPages;


     private currentAppPagesEntityID:string;

     public apps:VOApp[];
     public pages:VOPage[];
     public categories:VOCategory[];
     public groups:VOGroup[];
     public users:VOUser[];
     public financialGoal:VOFinancialGoal;
     public financialGoalReport:any;
     public skillPagesForCopy:VOPage[];

     public signedInUser:VOUser;

     public currentApp:VOApp;
     public currentPage:VOPage;
     public currentQuestion:VOQuestion;
     public currentSession:VOSession;
     public blackTheme:boolean = true;
     public curIntroPage:VOPage;
     public curEmotion:string;

     public categoriesHash:any;
     public groupsHash:any;
     public pagesCount:number = 0;





     constructor(public internal:ArrowBackendService)
     {
     }





     //--------------------------------------------------------------------------
     //
     // Get, Create, Update, Delete
     //
     //--------------------------------------------------------------------------
     private items(type:EnumType, exact:boolean = true):any[]
     {
          switch (type)
          {
               case EnumType.App:
                    return this.apps;


               case EnumType.Category:
                    return this.categories;


               case EnumType.Group:
                    return this.groups;


               case EnumType.Page:
                    return this.pages;


               case EnumType.Question:
                    return exact ? this.currentPage.questionnaire.questions : this.pages;
          }
     }





     public addItem(type:EnumType, payload:any):Promise<any>
     {
          payload[EnumField.AUID] = UUID.UUID();


          let params:Params = {
               method : EnumMethod.Create,
               type   : type,
               payload: payload,
               items  : JSON.parse(JSON.stringify(this.items(type, false))) //Deep Copy, required Pages
          };


          return this.itemAddEditDelete(params, moveReportToLast)
                  .then((response) => {

                       if (response[EnumField.STATUS] == '200')
                       {
                            // for EntityBased Items
                            if (type == EnumType.App || type == EnumType.Category || type == EnumType.Group)
                            {
                                 params.payload[EnumField.ENTITY_ID] = response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_ID];
                            }


                            // push newly added
                            this.items(params.type).push(params.payload);


                            // update local array
                            if (params.payload.type == EnumPage.INTRO ||
                                params.payload.type == EnumPage.QUESTIONNAIRE ||
                                params.payload.type == EnumPage.QUESTIONNAIRE_DYNAMIC ||
                                params.payload.type == EnumPage.SECTION)
                            {
                                 let reportPage:VOPage;
                                 let items:any[] = this.items(params.type, false);


                                 for (let i:number = 0; i < items.length; ++i)
                                 {
                                      if (items[i].type == EnumPage.REPORT)
                                      {
                                           reportPage = items[i];
                                           items.splice(i, 1);

                                           break;
                                      }
                                 }


                                 // report always come at last
                                 if (reportPage)
                                 {
                                      items.push(reportPage);
                                 }
                            }
                       }

                       return response;
                  });





          // for backend
          function moveReportToLast(items:any[])
          {
               let index:number;
               let reportPage:any;


               for (let i:number = 0; i < items.length; ++i)
               {
                    if (items[i].type == EnumPage.REPORT)
                    {
                         index = i;
                         reportPage = items[i];

                         break;
                    }
               }


               // push report at last
               if (reportPage)
               {
                    items.splice(index, 1);
                    items.push(reportPage);
               }
          }
     }





     public editItem(type:EnumType, payload:any):Promise<any>
     {
          let items:any[] = this.items(type);
          let index:number = items.findIndex((item) => item.auid == payload[EnumField.AUID]);


          let params:Params = {
               method : EnumMethod.Update,
               type   : type,
               payload: payload,
               items  : JSON.parse(JSON.stringify(this.items(type, false))), //Deep Copy, required Pages
               index  : index
          };


          return this.itemAddEditDelete(params)
                  .then((response) => {

                       if (response[EnumField.STATUS] == '200')
                       {
                            items[params.index] = params.payload;
                       }

                       return response;
                  });
     }





     public deleteItem(type:EnumType, payload:any):Promise<any>
     {
          let items:any[] = this.items(type);
          let index:number = items.findIndex((item) => item.auid == payload[EnumField.AUID]);


          let params:Params = {
               method : EnumMethod.Delete,
               type   : type,
               payload: payload,
               items  : JSON.parse(JSON.stringify(this.items(type, false))), //Deep Copy, required Pages
               index  : index
          };


          return this.itemAddEditDelete(params)
                  .then((response) => {

                       if (response[EnumField.STATUS] == '200')
                       {
                            items.splice(params.index, 1);
                       }

                       return response;
                  });
     }





     private async itemAddEditDelete(params:Params, handler?:Function):Promise<any>
     {
          try
          {
               let extraPayload:ExtraPayload;


               switch (params.type)
               {
                    case EnumType.App:
                    {
                         extraPayload = {
                              table   : EnumTable.APPS,
                              entityId: params.payload[EnumField.ENTITY_ID],
                              indexId : EnumField.APPS,
                         };


                         return await this.crudEntity(extraPayload, params);
                    }


                    case EnumType.Category:
                    {
                         extraPayload = {
                              table   : EnumTable.CATEGORIES,
                              entityId: params.payload[EnumField.ENTITY_ID],
                              indexId : `${EnumField.CATEGORIES}_${this.currentApp.entityId}`,
                         };


                         return await this.crudEntity(extraPayload, params);
                    }


                    case EnumType.Session:
                    {
                         extraPayload = {
                              table   : EnumTable.SESSIONS,
                              entityId: params.payload[EnumField.ENTITY_ID],
                              indexId : `${EnumField.SESSIONS}_${this.currentApp.entityId}_${this.signedInUser.entityId}`
                         };


                         return await this.crudEntity(extraPayload, params);
                    }


                    case EnumType.Group:
                    {
                         extraPayload = {
                              table   : EnumTable.GROUPS,
                              entityId: params.payload[EnumField.ENTITY_ID],
                              indexId : `${EnumField.GROUPS}_${this.currentApp.entityId}`,
                         };


                         return await this.crudEntity(extraPayload, params);
                    }


                    case EnumType.Page:
                    {
                         extraPayload = {
                              table   : EnumTable.PAGES,
                              entityId: this.currentAppPagesEntityID,
                              indexId : `${EnumField.PAGES}_${this.currentApp.entityId}`
                         };


                         this.applyCRUD(params.items, params, handler);
                         break;
                    }


                    case EnumType.Question:
                    {
                         extraPayload = {
                              table   : EnumTable.PAGES,
                              entityId: this.currentAppPagesEntityID,
                         };


                         let pageIndex:number = params.items.findIndex((item) => item.auid == this.currentPage.auid);
                         let page:VOPage = params.items[pageIndex];


                         this.applyCRUD(page.questionnaire.questions, params);
                         break;
                    }
               }


               return await this.crudArray(extraPayload, params);
          }
          catch (error)
          {
               throw error || {msg: "Operation Failed"};
          }
     }





     private applyCRUD(items:any[], params:Params, handler?:Function):void
     {
          switch (params.method)
          {
               case EnumMethod.Create:
               {
                    items.push(params.payload);
                    break;
               }


               case EnumMethod.Update:
               {
                    items[params.index] = params.payload;
                    break;
               }


               case EnumMethod.Delete:
               {
                    items.splice(params.index, 1);
                    break;
               }
          }


          if (handler)
          {
               handler(items);
          }
     }





     private async crudEntity(payload:ExtraPayload, params:Params):Promise<any>
     {
          let finalPayload:any = {};
          finalPayload[EnumField.TABLE] = payload.table;
          finalPayload[EnumField.METHOD] = params.method;
          finalPayload[EnumField.AUID] = (params.method == EnumMethod.Create) ? payload.indexId : payload.entityId;


          if (params.method == EnumMethod.Create ||
              params.method == EnumMethod.Update)
          {
               finalPayload[EnumField.INFO] = {info: params.payload};
          }


          return await this.internal.callCloudScript(EnumScript.aDynamicDB, finalPayload);
     }





     private async crudArray(payload:ExtraPayload, params?:Params):Promise<any>
     {
          let finalPayload:any = {};
          finalPayload[EnumField.INFO] = {info: params.items};
          finalPayload[EnumField.TABLE] = payload.table;
          finalPayload[EnumField.AUID] = payload.entityId || payload.indexId;
          finalPayload[EnumField.METHOD] = payload.entityId ? EnumMethod.Update : EnumMethod.Create;


          let response:any = await this.internal.callCloudScript(EnumScript.aDynamicDB, finalPayload);
          if (!this.currentAppPagesEntityID)
          {
               this.currentAppPagesEntityID = response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_ID];
          }


          return response;
     }





     //--------------------------------------------------------------------------
     //
     // Apps
     //
     //--------------------------------------------------------------------------
     public getApps(admin:boolean = false):Promise<any>
     {
          console.log('getApps');
          let payload:any = {};
          payload[EnumField.TABLE] = EnumTable.APPS;


          return this.internal.callCloudScript(EnumScript.aDBList, payload)
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((items) => {

                       if (!admin && this.signedInUser.role == EnumRole.USER)
                       {
                            return items.filter((item) => item[EnumField.DATA][EnumField.INFO].active);
                       }

                       return items;
                  })

                  .then((items) => {

                       return items.map((item) => {

                            let app:VOApp = new VOApp(item[EnumField.DATA][EnumField.INFO]);
                            app.entityId = item[EnumField.ENTITY_ID];

                            return app;
                       });
                  });
     }





     public getApp(id:string):VOApp
     {
          if (!id)
          {
               this.currentApp = null;
          }
          else
          {
               this.currentApp = this.apps.find((item) => item.auid == id);
          }


          return this.currentApp;
     }





     //--------------------------------------------------------------------------
     //
     // App Data
     //
     //--------------------------------------------------------------------------
     public getAppPagesFinancialGoal():VOPage[]
     {
          this.financialGoal = new VOFinancialGoal();


          return [
               // new VOPage({
               // 	type : EnumPage.INTRO,
               // 	auid : "id",
               // 	intro: {
               // 		title      : "How To Use",
               // 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim " +
               // 				   "ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
               // 				   "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt " +
               // 				   "in culpa qui officia deserunt mollit anim id est laborum.",
               // 		video_link : "https://www.youtube.com/watch?v=szby7ZHLnkA",
               // 	}
               // }),
               new VOPage({
                    type         : EnumPage.QUESTIONNAIRE,
                    auid         : EnumRoute.ANNUAL_GOAL,
                    questionnaire: {
                         auid: EnumField.ANNUAL_GOAL,
                    }
               }),
               new VOPage({
                    type         : EnumPage.QUESTIONNAIRE,
                    auid         : EnumRoute.AVERAGE_SALE_PRICE,
                    questionnaire: {
                         auid: EnumField.PRODUCTS,
                    }
               }),
               new VOPage({
                    type: EnumPage.QUESTIONNAIRE,
                    auid: EnumRoute.AVERAGE_SALE_REQUIRED
               }),
               new VOPage({
                    type         : EnumPage.QUESTIONNAIRE,
                    auid         : EnumRoute.SALE_CONVERSION,
                    questionnaire: {
                         auid: EnumField.SALE_CONVERSION,
                    }
               }),
               new VOPage({
                    type: EnumPage.QUESTIONNAIRE,
                    auid: EnumRoute.LEADS_REQUIRED
               }),
               new VOPage({
                    type         : EnumPage.QUESTIONNAIRE,
                    auid         : EnumRoute.TASKS,
                    questionnaire: {
                         auid: EnumField.TASKS,
                    }
               }),
               new VOPage({
                    type: EnumPage.QUESTIONNAIRE,
                    auid: EnumRoute.SUMMARY
               }),
               new VOPage({
                    type  : EnumPage.REPORT,
                    title : "Report",
                    report: {
                         formula: EnumReport.FINANCIAL_GOALS
                    }
               }),
          ];
     }





     public getAppPagesSkills(pages:VOPage[]):VOPage[]
     {
          // skills 90977963-244e-6df5-b613-d5221fb900b1
          // traits 069c841c-5d8b-de91-1c21-1ddf1c515384


          // keep original pages
          this.skillPagesForCopy = [
               pages[0], // skill
               pages[1], // trait
          ];
          pages.splice(0, 2);
          pages.splice(1, 0,
                  new VOPage({
                       type    : EnumPage.TEMPLATE,
                       auid    : EnumRoute.PROFESSION,
                       template: {}
                  }));


          // add template
          pages.splice(6, 0,
                  new VOPage({
                       type    : EnumPage.TEMPLATE,
                       auid    : EnumRoute.PASSION,
                       template: {}
                  }));


          // add template before report
          // pages.splice(pages.length - 1, 0,
          //         new VOPage({
          //              type    : EnumPage.TEMPLATE,
          //              auid    : EnumRoute.GOALS,
          //              template: {}
          //         }));


          return pages;
     }





     public getAppPagesEmotions(pages:VOPage[]):VOPage[]
     {
          // add template at start
          pages.unshift(
                  new VOPage({
                               type    : EnumPage.TEMPLATE,
                               auid    : EnumRoute.EMOTIONS,
                               template: {}
                          }
                  ));

          return pages;
     }





     public getAppPages(appId:string):Promise<any>
     {
          console.log("getAppPages");
          let payload:any = {};
          payload[EnumField.TABLE] = EnumTable.PAGES;
          payload[EnumField.INDEXED_ID] = `${EnumField.PAGES}_${appId}`;


          return this.internal.callCloudScript(EnumScript.aDBList, payload)
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((items) => {

                       this.currentAppPagesEntityID = null;

                       if (items.length)
                       {
                            this.currentAppPagesEntityID = items[0][EnumField.ENTITY_ID];
                            return items[0][EnumField.DATA][EnumField.INFO];
                       }

                       return items;
                  })

                  .then((pages) => {

                       if (this.signedInUser.role == EnumRole.USER)
                       {
                            pages = pages.filter((itemPage) => {

                                 // skip empty questionnaire
                                 if (itemPage.questionnaire && !itemPage.questionnaire.questions.length && !itemPage.questionnaire.template)
                                 {
                                      return false;
                                 }

                                 return itemPage.active;
                            });
                       }


                       return pages.map((item) => new VOPage(item));
                  });
     }





     public getAppCategories(appId:string):Promise<any>
     {
          let payload:any = {};
          payload[EnumField.TABLE] = EnumTable.CATEGORIES;
          payload[EnumField.INDEXED_ID] = `${EnumField.CATEGORIES}_${appId}`;


          return this.internal.callCloudScript(EnumScript.aDBList, payload)
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((items) => {

                       return items.map((item) => {

                            let category:VOCategory = new VOCategory(item[EnumField.DATA][EnumField.INFO]);
                            category.entityId = item[EnumField.ENTITY_ID];

                            return category;
                       });
                  })

                  .then((items) => {

                       this.categoriesHash = items.reduce((acc, item) => {

                            acc[item.auid] = item;
                            return acc;

                       }, {});


                       return items;
                  });
     }





     public getAppGroups(appId:string):Promise<any>
     {
          let payload:any = {};
          payload[EnumField.TABLE] = EnumTable.GROUPS;
          payload[EnumField.INDEXED_ID] = `${EnumField.GROUPS}_${appId}`;


          return this.internal.callCloudScript(EnumScript.aDBList, payload)
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((items) => {

                       return items.map((item) => {

                            let group:VOGroup = new VOGroup(item[EnumField.DATA][EnumField.INFO]);
                            group.entityId = item[EnumField.ENTITY_ID];

                            return group;
                       });
                  })

                  .then((items) => {

                       this.groupsHash = items.reduce((acc, item) => {

                            acc[item.auid] = item;
                            return acc;

                       }, {});


                       return items;
                  });
     }





     //--------------------------------------------------------------------------
     //
     // Categories
     //
     //--------------------------------------------------------------------------
     public getCategory(id:string):VOCategory
     {
          return this.categories.find((item) => item.auid == id);
     }





     public updateCategoryHash(id:string, categoryItem?:any):void
     {
          if (!categoryItem)
          {
               delete this.categoriesHash[id];
          }
          else
          {
               this.categoriesHash[id] = categoryItem;
          }
     }





     //--------------------------------------------------------------------------
     //
     // Groups
     //
     //--------------------------------------------------------------------------
     public getGroup(id:string):VOGroup
     {
          return this.groups.find((item) => item.auid == id);
     }





     public updateGroupHash(id:string, groupItem?:any):void
     {
          if (!groupItem)
          {
               delete this.groupsHash[id];
          }
          else
          {
               this.groupsHash[id] = groupItem;
          }
     }





     //--------------------------------------------------------------------------
     //
     // Pages
     //
     //--------------------------------------------------------------------------
     public getPages():VOPage[]
     {
          return this.pages;
     }





     public getPage(id:string):VOPage
     {
          if (!id)
          {
               this.currentPage = null;
          }
          else
          {
               this.currentPage = this.pages.find((item) => item.auid == id);
          }


          return this.currentPage;
     }





     //--------------------------------------------------------------------------
     //
     // Questions
     //
     //--------------------------------------------------------------------------
     public getQuestion(id:string):VOQuestion
     {
          if (!id)
          {
               this.currentQuestion = null;
          }
          else
          {
               this.currentQuestion = this.currentPage.questionnaire.questions.find((item) => item.auid == id);
          }


          return this.currentQuestion;
     }





     //--------------------------------------------------------------------------
     //
     // Sessions
     //
     //--------------------------------------------------------------------------
     public getSessions(appId:string):Promise<any>
     {
          let payload:any = {};
          payload[EnumField.TABLE] = EnumTable.SESSIONS;
          payload[EnumField.INDEXED_ID] = `${EnumField.SESSIONS}_${appId}_${this.signedInUser.entityId}`;


          return this.internal.callCloudScript(EnumScript.aDBList, payload)
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((items) => {

                       return items.map((item) => {

                            let session:VOSession = new VOSession(item[EnumField.DATA][EnumField.INFO]);
                            session.entityId = item[EnumField.ENTITY_ID];
                            session.created_at = new Date(item[EnumField.CREATED_AT]).toLocaleDateString();
                            session.updated_at = item[EnumField.UPDATED_AT];

                            return session;
                       });
                  });
     }





     public saveSession(answers:any):Promise<any>
     {
          let params:Params = {
               method : this.currentSession.entityId ? EnumMethod.Update : EnumMethod.Create,
               type   : EnumType.Session,
               payload: {
                    title   : this.currentSession.title,
                    answers : answers,
                    entityId: this.currentSession.entityId
               },
          };


          return this.itemAddEditDelete(params)
                  .then((response) => {

                       this.currentSession.answers = {...answers};
                       this.currentSession.entityId = response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_ID];
                  });
     }





     public deleteSession(entityId:any):Promise<any>
     {
          let params:Params = {
               method : EnumMethod.Delete,
               type   : EnumType.Session,
               payload: {
                    entityId: entityId
               }
          };


          return this.itemAddEditDelete(params);
     }





     //--------------------------------------------------------------------------
     //
     // Users
     //
     //--------------------------------------------------------------------------
     public saveUser(user:any):Promise<any>
     {
          let payload = {};
          payload["userId"] = user.userId;
          payload["entityId"] = user.entityId;
          payload["email"] = user.username;
          payload["name"] = user.name;
          payload["role"] = user.role;
          payload["active"] = user.active;
          payload["user_roles"] = user.user_roles;


          let finalPayload = {
               table : EnumTable.USERS,
               method: EnumMethod.Update,
               auid  : user.entityId,
               info  : {info: payload}
          };


          return this.internal.callCloudScript(EnumScript.aDynamicDB, finalPayload);
     }





     public getUserDetail(userId, password):Promise<any>
     {
          return this.internal.callCloudScript(EnumScript.aDBList, {table: EnumTable.USERS})
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((users) => {

                       for (let itemUser of users)
                       {
                            let info = itemUser.data.info;


                            if (info && info.userId == userId)
                            {
                                 return Promise.resolve({
                                      userId    : info.userId,
                                      entityId  : info.entityId,
                                      username  : info.email,
                                      password  : password,
                                      name      : info.name,
                                      role      : info.role,
                                      active    : info.active,
                                      user_roles: info.user_roles || {}
                                 });
                            }
                       }


                       throw {msg: "Incomplete user account."};
                  })

                  .then((user) => {

                       if (!user.active)
                       {
                            throw {msg: "You are blocked. Contact Admin."};
                       }

                       return user;
                  })
     }





     public getUsers():Promise<any>
     {
          return this.internal.callCloudScript(EnumScript.aDBList, {table: EnumTable.USERS})
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])

                  .then((users) => {

                       return users.map((item) => {
                            return new VOUser(item.data[EnumField.INFO]);
                       });
                  });
     }





     public getUser(id:string):VOUser
     {
          return this.users.find((item) => item.entityId == id);
     }





     //--------------------------------------------------------------------------
     //
     // Other
     //
     //--------------------------------------------------------------------------
     public saveOrder():Promise<any>
     {
          console.log(this.pages);

          let payload:any = {};
          payload[EnumField.TABLE] = EnumTable.PAGES;
          payload[EnumField.AUID] = this.currentAppPagesEntityID;
          payload[EnumField.METHOD] = EnumMethod.Update;
          payload[EnumField.INFO] = {info: JSON.parse(JSON.stringify(this.pages))};


          return this.internal.callCloudScript(EnumScript.aDynamicDB, payload);
     }





     public isReportAlreadyAdded():boolean
     {
          for (let item of this.pages)
          {
               if (item.type == EnumPage.REPORT)
               {
                    return true;
               }
          }


          return false;
     }





     public updateEmotion(emotion:string, title:string):void
     {
          this.curEmotion = emotion;


          // "How Does _ Make You Feel ?"
          let arr = title.split(" ");
          arr[2] = emotion;
          let newTitle:string = arr.join(" ");


          for (let itemPage of this.pages)
          {
               if (itemPage.questionnaire && itemPage.questionnaire.title.includes("How"))
               {
                    itemPage.questionnaire.title = newTitle;
               }
          }
     }





     public getAll():void
     {
          let payload:any = {};
          payload[EnumField.TABLE] = "users";


          this.internal.callCloudScript(EnumScript.aDBList, payload)
                  .then((response) => response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST])
          // .then((pages) => {
          //
          //    console.log(this.pages[8].questionnaire.categories[0].questions);
          //    console.log(pages[8].questionnaire.categories[0].questions);
          // });
     }





     public async bulkDelete()
     {
          let response:any = await this.internal.callCloudScript(EnumScript.aDBList, {table: EnumTable.SESSIONS});


          let ids:string[] = response[EnumField.DATA][EnumField.RESPONSE][EnumField.DATA][EnumField.ENTITY_LIST]
                  .map((item) => item[EnumField.ENTITY_ID]);


          for (let id of ids)
          {
               let payload:any = {};
               payload[EnumField.TABLE] = EnumTable.APPS;
               payload[EnumField.AUID] = id;
               payload[EnumField.METHOD] = EnumMethod.Delete;


               await this.internal.callCloudScript(EnumScript.aDynamicDB, payload);
          }
     }
}
