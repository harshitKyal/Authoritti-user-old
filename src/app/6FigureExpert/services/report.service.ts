import {Injectable} from '@angular/core';
import {VOPage} from "../../vo/VOPage";
import {EnumCloseRate, EnumDynamicQuestion, EnumField, EnumQuestion, EnumReport, EnumSource, EnumType} from "../../enums/Enums";
import {VOCategory} from "../../vo/VOCategory";
import {ReportItem, VOReport} from "../../vo/VOReport";
import {VOQuestion} from "../../vo/VOQuestion";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {VOGroup} from "../../vo/VOGroup";
import { VOFinancialGoal } from '../pages/apps/custom/financial-goals/vo/VOFinancialGoal';
import { Base } from 'src/app/base/Base';


@Injectable({
     providedIn: 'root'
})
export class ReportService
{

     private basePageObject = new Base();
     constructor(private http:HttpClient,
                 private backendService:BackendService)
     {
     }


     //calculating summary data of all products..
     public calculate(days:number, financialGoal: VOFinancialGoal):any[]
	{
		let products:any[] = [];
		let totalYearDays:number = this.basePageObject.dataManager.isLeapYear(new Date().getFullYear()) ? 366 : 365;
		let result:number = days / totalYearDays;

		for (let itemProduct of Object.values(financialGoal.products))
		{
			let item:any = {
				name          : itemProduct['name'],
				dollarValue   : `$${this.basePageObject.dataManager.numberWithCommas(itemProduct['dollarValue'], 2)}`,
				saleValue     : `${this.basePageObject.dataManager.numberWithCommas(result * itemProduct['saleValue'], 2)}%`,
				generatedSales: `$${this.basePageObject.dataManager.numberWithCommas(result * itemProduct['generatedSales'](financialGoal.annual_goal), 2)}`,
				closeRate     : EnumCloseRate.find((item) => item.id == itemProduct['closeRate']).name,
				salesRequired : `${this.basePageObject.dataManager.numberWithCommas(result * itemProduct['salesInUnits'](financialGoal.annual_goal), 2)}`,
				leadsRequired : `${this.basePageObject.dataManager.numberWithCommas(result * itemProduct['leadsRequired'](financialGoal.annual_goal), 2)}`,
			};
			products.push(item);
		}
		return products;
	}


     
     public generateReport(pages:VOPage[], report:VOReport):any
     {
          switch (report.formula.code)
          {
               case EnumReport.FINANCIAL_GOALS.code:
               {
                    return this.generateFinancialGoals();
               }


               case EnumReport.SIMPLE.code:
               {
                    return this.generateAnswersReport(pages);
               }


               case EnumReport.ARCHETYPE.code:
               {
                    return this.generateArchetypeReport(pages);
               }


               case EnumReport.DRIVER.code:
               {
                    return this.generateEgotisticReport(pages);
               }


               case EnumReport.TRAITS.code:
               {
                    return this.generateTraitsReport(pages);
               }


               case EnumReport.NATURAL_GIFTS.code:
               {
                    return this.generateGiftsReport(pages);
               }


               case EnumReport.EMOTIONS.code:
               {
                    return this.generateEmotionsReport(pages);
               }


               case EnumReport.SKILLS.code:
               {
                    return this.generateSkills(pages);
               }
          }
     }





     //--------------------------------------------------------------------------
     //
     // Archetype
     //
     //--------------------------------------------------------------------------
     private generateArchetypeReport(pages:VOPage[]):ReportItem[]
     {
          let pagesHash:any = this.processPages(pages);
          let finalPagesHash:any = this.processQuestions(pagesHash);


          let finalReportItems:ReportItem[] = [];


          for (let key in finalPagesHash)
          {
               if (finalPagesHash.hasOwnProperty(key))
               {
                    let {category, questions} = finalPagesHash[key];


                    if (category)
                    {
                         let sum:number = this.calculateSum(questions);


                         finalReportItems.push({
                              key  : category.title,
                              value: sum
                         });
                    }
               }
          }


          this.sort(finalReportItems);
          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // Egotistic
     //
     //--------------------------------------------------------------------------
     private generateEgotisticReport(pages:VOPage[]):ReportItem[]
     {
          let pagesHash:any = this.processPages(pages);
          let finalPagesHash:any = this.processQuestions(pagesHash);


          let finalReportItems:ReportItem[] = [];
          let reportItems:ReportItem[] = [];
          let totalQuestions:number = 0;
          let totalValues:number = 0;


          // calculate totalQuestions
          totalQuestions = Number(Object.values(finalPagesHash)
                  .reduce((acc, item:any) => {

                       return item.category
                               ? acc + item.questions.length
                               : acc;
                  }, 0));


          for (let key in finalPagesHash)
          {
               if (finalPagesHash.hasOwnProperty(key))
               {
                    let {category, questions} = finalPagesHash[key];


                    if (category)
                    {
                         let sum:number = this.calculateSum(questions);
                         totalValues += sum;


                         reportItems.push({
                              key  : category.title,
                              value: ((sum * 10) / totalQuestions).toFixed(),
                         });
                    }
               }
          }


          finalReportItems.push({
               key  : this.backendService.currentApp.title,
               value: reportItems,
          });


          // calculate egotistical
          if (totalQuestions && totalValues)
          {
               finalReportItems[0].key += ` ${((totalValues * 10) / totalQuestions).toFixed()}%`
          }


          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // Traits
     //
     //--------------------------------------------------------------------------
     private generateTraitsReport(pages:VOPage[]):ReportItem[]
     {
          let pagesHash:any = this.processPages(pages);
          let finalPagesHash:any = this.processQuestions(pagesHash);


          let finalReportItems:ReportItem[] = [];


          for (let key in finalPagesHash)
          {
               if (finalPagesHash.hasOwnProperty(key))
               {
                    let {category, questions} = finalPagesHash[key];


                    if (category)
                    {
                         let finalGroups:any[] = [];


                         // add questions in groups
                         for (let itemGroup of category.groups)
                         {
                              let groupQuestions:any[] = [];
                              for (let itemQuestion of itemGroup.questions)
                              {
                                   if (itemQuestion.type == EnumQuestion.SLIDER && itemQuestion.answer > 0)
                                   {
                                        groupQuestions.push({
                                             key  : itemQuestion.title,
                                             value: itemQuestion.answer,
                                        });
                                   }
                              }


                              if (groupQuestions.length)
                              {
                                   this.sort(groupQuestions);


                                   finalGroups.push({
                                        key  : `Category: ${itemGroup.title} Traits`,
                                        value: groupQuestions,
                                   });
                              }
                         }


                         // calculate category
                         if (finalGroups.length)
                         {
                              let totalTraits:number = questions.length;
                              let totalValues:number = 0;


                              for (let itemQuestion of questions)
                              {
                                   if (itemQuestion.answer > 0)
                                   {
                                        totalValues += itemQuestion.answer;
                                   }
                              }


                              finalReportItems.push({
                                   key  : `${category.title} Traits ${parseFloat((totalValues / totalTraits).toFixed())}%`,
                                   value: finalGroups
                              });
                         }
                    }
               }
          }


          return finalReportItems;
     }





     private generateAnswersReport(pages:VOPage[]):ReportItem[]
     {
          let pagesHash:any = this.processPages(pages);
          let finalPagesHash:any = this.processQuestions(pagesHash);


          let finalReportItems:ReportItem[] = [];


          for (let key in finalPagesHash)
          {
               if (finalPagesHash.hasOwnProperty(key))
               {
                    let {group, questions} = finalPagesHash[key];


                    if (group)
                    {
                         finalReportItems.push({
                              type : EnumType.Group,
                              key  : group.title,
                              value: null
                         });
                    }


                    let reportItems:any[] = this.processAnswers(questions);
                    if (reportItems.length)
                    {
                         finalReportItems.push(...reportItems);
                    }
               }
          }


          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // Gifts
     //
     //--------------------------------------------------------------------------
     private generateGiftsReport(pages:VOPage[]):ReportItem[]
     {
          let pagesHash:any = this.processPages(pages);
          let finalPagesHash:any = this.processQuestions(pagesHash);


          let finalReportItems:ReportItem[] = [];
          let reportItemsCategory:ReportItem[] = [];
          let reportItems:ReportItem[] = [];


          for (let key in finalPagesHash)
          {
               if (finalPagesHash.hasOwnProperty(key))
               {
                    let {group, category, questions} = finalPagesHash[key];


                    if (category)
                    {
                         let sum:number = this.calculateSum(questions);
                         if (sum > 0)
                         {
                              reportItemsCategory.push({
                                   type : EnumType.Category,
                                   key  : category.title,
                                   value: sum,
                              });
                         }
                    }
                    else
                    {
                         if (group)
                         {
                              reportItems.push({
                                   type : EnumType.Group,
                                   key  : group.title,
                                   value: null
                              });
                         }


                         let finalItems:any[] = this.processAnswers(questions);
                         if (finalItems.length)
                         {
                              reportItems.push(...finalItems);
                         }
                    }
               }
          }


          this.sort(reportItemsCategory);


          finalReportItems.push(...reportItemsCategory);
          finalReportItems.push(...reportItems);


          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // Emotions
     //
     //--------------------------------------------------------------------------
     private generateEmotionsReport(pages:VOPage[]):ReportItem[]
     {
          let finalReportItems:ReportItem[] = this.generateAnswersReport(pages)
                  .filter((item) => item.type != EnumQuestion.SLIDER);


          finalReportItems.unshift({
               type : EnumType.Group,
               key  : `Your Trigger Emotion is '${this.backendService.curEmotion}'`,
               value: null
          });


          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // FinancialGoals
     //
     //--------------------------------------------------------------------------
     private generateFinancialGoals():ReportItem[]
     {
          let finalReportItems:ReportItem[] = [];


          for (let itemReport of this.backendService.financialGoalReport)
          {
               finalReportItems.push({
                    key  : itemReport.key,
                    value: itemReport.value
               });
          }


          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // Skills
     //
     //--------------------------------------------------------------------------
     private generateSkills(pages:VOPage[]):ReportItem[]
     {
          let pagesHash:any = this.processPages(pages);
          let finalPagesHash:any = this.processQuestions(pagesHash);


          let finalReportItems:ReportItem[] = [];
          let reportItemsCategory:ReportItem[] = [];
          let reportItems:ReportItem[] = [];


          for (let key in finalPagesHash)
          {
               if (finalPagesHash.hasOwnProperty(key))
               {
                    let {group, category, questions} = finalPagesHash[key];


                    if (category)
                    {
                         let sum:number = this.calculateSum(questions);
                         if (sum > 0)
                         {
                              reportItemsCategory.push({
                                   type : EnumType.Category,
                                   key  : category.title,
                                   value: sum,
                              });
                         }
                    }

                    // skip auto generated Skill & Trait pages
                    else if (!key.includes("skill") && !key.includes("trait"))
                    {
                         if (group)
                         {
                              reportItems.push({
                                   type : EnumType.Group,
                                   key  : group.title,
                                   value: null
                              });
                         }


                         let finalItems:any[] = this.processAnswers(questions);
                         if (finalItems.length)
                         {
                              reportItems.push(...finalItems);
                         }
                    }
               }
          }


          this.sort(reportItemsCategory);


          // template group
          // reportItems.push({
          //      type : EnumType.Group,
          //      key  : "What I Know For Sure",
          //      value: null
          // });
          // // template page
          // reportItems.push({
          //      type : EnumTemplate.GOALS,
          //      key  : null,
          //      value: pages.find((item) => item.auid == EnumTemplate.GOALS).template.data
          //              .filter((itemGoal) => itemGoal.steps.length)
          // });


          finalReportItems.push(...reportItems);
          finalReportItems.push({
               type : EnumType.Group,
               key  : "Your Strengths",
               value: null
          });
          finalReportItems.push(...reportItemsCategory);


          return finalReportItems;
     }





     //--------------------------------------------------------------------------
     //
     // Other
     //
     //--------------------------------------------------------------------------
     private processPages(pages:VOPage[]):any
     {
          let pagesHash:any = {};


          for (let itemPage of pages)
          {
               // skip non question
               if (!itemPage.questionnaire)
               {
                    continue;
               }


               let groupId:string = itemPage.questionnaire.group_id;
               let group:VOGroup = groupId && this.backendService.groupsHash[groupId];


               if (group)
               {
                    // dont exists already
                    if (!pagesHash[groupId])
                    {
                         pagesHash[groupId] = {
                              group      : {id: groupId, title: group.title},
                              category_id: null,
                              pages      : []
                         };
                    }


                    // always last category
                    if (itemPage.questionnaire.category)
                    {
                         pagesHash[groupId].category_id = itemPage.questionnaire.category;
                    }


                    // combine pages of same group
                    pagesHash[groupId].pages.push(itemPage);
               }
               else
               {
                    pagesHash[itemPage.auid] = {
                         group      : null,
                         category_id: itemPage.questionnaire.category,
                         pages      : [itemPage]
                    };
               }
          }


          return pagesHash;
     }





     private processQuestions(pagesHash:any):any
     {
          let questionsHash:any = {};


          for (let key in pagesHash)
          {
               if (pagesHash.hasOwnProperty(key))
               {
                    let {group, category_id, pages} = pagesHash[key];
                    let category:VOCategory = category_id && this.backendService.categoriesHash[category_id];


                    if (category)
                    {
                         // not exists already
                         if (!questionsHash[category_id])
                         {
                              questionsHash[category_id] = {
                                   group    : null,
                                   category : {id: category_id, title: category.title, groups: []},
                                   questions: []
                              };
                         }
                         let hash = questionsHash[category_id];


                         // combine questions of same category
                         for (let itemPage of pages)
                         {
                              if (itemPage.questionnaire.category)
                              {
                                   hash.questions.push(
                                           ...itemPage.questionnaire.questions
                                   );
                              }
                         }


                         if (group)
                         {
                              let groupQuestions:any[] = [];
                              for (let itemPage of pages)
                              {
                                   groupQuestions.push(
                                           ...itemPage.questionnaire.questions
                                   );
                              }


                              hash.category.groups.push({
                                   title    : group.title,
                                   questions: groupQuestions
                              });
                         }
                    }
                    else if (group)
                    {
                         // groups have been formed in ProcessPages
                         questionsHash[key] = {
                              group    : group,
                              category : null,
                              questions: []
                         };
                         let hash = questionsHash[key];


                         // combine questions of multiple pages in a single group
                         for (let itemPage of pages)
                         {
                              hash.questions.push(
                                      ...itemPage.questionnaire.questions
                              );
                         }
                    }
                    else
                    {
                         questionsHash[key] = {
                              group    : null,
                              category : null,
                              questions: pages[0].questionnaire.questions
                         };
                    }
               }
          }


          return questionsHash;
     }





     private processAnswers(questions:VOQuestion[]):any
     {
          let reportItems:ReportItem[] = [];


          for (let itemQuestion of questions)
          {
               if (!itemQuestion.hasAnswer)
               {
                    continue;
               }


               let reportItem:any;
               switch (itemQuestion.type)
               {
                       // slider
                    case EnumQuestion.SLIDER:
                    {
                         reportItem = this.getSliderReportItem(itemQuestion);
                         break;
                    }


                       // textInput
                    case EnumQuestion.TEXT_INPUT:
                    {
                         reportItem = this.getTextInputReportItem(itemQuestion);
                         break;
                    }


                       // check
                    case EnumQuestion.MULTI_CHOICE:
                    {
                         reportItem = this.getCheckReportItem(itemQuestion);
                         break;
                    }


                       // multiTextInput
                    case EnumQuestion.MULTI_TEXT_INPUT:
                    {
                         reportItem = this.getMultiInputReportItem(itemQuestion);
                         break;
                    }


                       // radio
                    case EnumQuestion.SINGLE_CHOICE:
                    {
                         reportItem = this.getRadioReportItem(itemQuestion);
                         break;
                    }


                       // textArea
                    case EnumQuestion.TEXT_AREA:
                    {
                         reportItem = this.getTextAreaReportItem(itemQuestion);
                         break;
                    }


                       // tableYesNo
                    case EnumDynamicQuestion.TABLE_YES_NO:
                    {
                         reportItem = this.getTableYesNoReportItem(itemQuestion);
                         break;
                    }


                       // tableDropDown
                    case EnumDynamicQuestion.TABLE_DROP_DOWN:
                    {
                         reportItem = this.getTableDropDownReportItem(itemQuestion);
                         break;
                    }


                       // checkGroup
                    case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
                    {
                         reportItem = this.getTableCheckGroupReportItem(itemQuestion);
                         break;
                    }


                       // tableSkillTrait
                    case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
                    {
                         reportItem = this.getTableSkillTraitReportItem(itemQuestion);
                         break;
                    }
               }


               if (reportItem)
               {
                    reportItems.push(reportItem);
               }
          }


          // combine sliders
          let sliders = reportItems.filter((item) => item.type == EnumQuestion.SLIDER);
          if (sliders.length)
          {
               let reportItem = {
                    type : EnumQuestion.SLIDER,
                    key  : '',
                    value: sliders
               };


               // insert sliders group at start
               reportItems = reportItems.filter((item) => item.type != EnumQuestion.SLIDER);
               reportItems.unshift(reportItem);
          }


          return reportItems;
     }





     private calculateSum(questions:VOQuestion[]):number
     {
          let sum:number = 0;

          for (let itemQuestion of questions)
          {
               if (itemQuestion.type == EnumQuestion.SLIDER)
               {
                    sum += itemQuestion.answer;
               }
          }

          return sum;
     }





     private sort(items:ReportItem[], ascend:boolean = false):void
     {
          // descending
          items.sort((a, b) => b.value - a.value);


          if (ascend)
          {
               items.reverse();
          }
     }





     private getSliderReportItem(question:VOQuestion):any
     {
          if (question.answer <= 0)
          {
               return null;
          }


          return {
               type : question.type,
               key  : question.title,
               value: question.slider.tags[question.answer - question.slider.min_value] || question.answer,
          };
     }





     private getTextInputReportItem(question:VOQuestion):any
     {
          return {
               type : question.type,
               key  : question.title,
               value: question.answer,
          };
     }





     private getCheckReportItem(question:VOQuestion):any
     {
          return {
               type : question.type,
               key  : question.title,
               value: Object.keys(question.answer)
                       .map((key) => question.check.options.find((item) => item.auid == key).name)
          };
     }





     private getMultiInputReportItem(question:VOQuestion):any
     {
          let reportItem = {
               type : question.type,
               key  : question.title,
               value: null
          };


          if (question.multi_text_input.inputs.length == 1)
          {
               reportItem.value = [{value: question.answer[question.multi_text_input.inputs[0].auid]}];
          }
          else
          {
               reportItem.value = question.multi_text_input.inputs
                       .map((item, index) => {

                            let placeholder:string = item.input.placeholder || `Ans ${index + 1}`;
                            let answer:string = question.answer[item.auid] || "";

                            return {key: placeholder, value: answer};
                       });
          }


          return reportItem;
     }





     private getRadioReportItem(question:VOQuestion):any
     {
          let key:string = question.answer[EnumField.AUID];
          return {
               type : question.type,
               key  : question.title,
               value: (key == EnumField.OTHER)
                       ? question.answer[EnumField.OTHER] || 'Other'
                       : question.radio.options.find((item) => item.auid == key).name
          };
     }





     private getTextAreaReportItem(question:VOQuestion):any
     {
          return {
               type : question.type,
               key  : question.title,
               value: question.answer,
          };
     }





     private getTableYesNoReportItem(question:VOQuestion):any
     {
          return {
               type : question.type,
               key  : [
                    "Name",
                    "Score",
                    "Value",
                    `${question.table_yes_no.yes_label}/${question.table_yes_no.no_label}`,
               ],
               value: question.table_yes_no.rows
                       .map((item) => {

                            let option = item.radio.options.find((itemOption) => itemOption.auid == item.radio.answers[EnumField.AUID]);
                            return [
                                 item.name,
                                 item.score,
                                 item.scoreName,
                                 option ? option.name : ''
                            ];
                       })
          };
     }





     private getTableDropDownReportItem(question:VOQuestion):any
     {
          let report = {
               type : question.type,
               key  : question.table_drop_down.columns,
               value: question.table_drop_down.rows
                       .map((item) => {

                            let option = question.table_drop_down.options.find((itemOption) => itemOption.auid == item.answer);
                            return [
                                 item.name,
                                 item.value,
                                 option ? option.name : ''
                            ];
                       })
          };


          if (question.source == EnumSource.MULTI_CHOICE_GROUP)
          {
               report.value.sort((a:any, b:any) => b[2] - a[2]);
          }


          return report;
     }





     private getTableCheckGroupReportItem(question:VOQuestion):any
     {
          let report = {
               type : question.type,
               key  : null,
               value: []
          };


          for (let itemQuestion of question.check_group.questions)
          {
               if (!itemQuestion.check.hasAnswer)
               {
                    continue;
               }


               let options = Object.keys(itemQuestion.check.finalAnswer)
                       .map((key) => itemQuestion.check.options.find((item) => item.auid == key).name);


               report.value.push({
                    key  : itemQuestion.title,
                    value: options
               });
          }


          return report;
     }





     private getTableSkillTraitReportItem(question:VOQuestion):any
     {
          return {
               type : question.type,
               key  : null,
               value: [
                    {
                         type : EnumDynamicQuestion.TABLE_SKILL,
                         key  : ["Skills", "Average Score", "Use"],
                         value: question.table_skill_trait.skillRows
                                 .filter((item) => item.is_top_ten)
                                 .map((item) => {

                                      return [
                                           item.name,
                                           item.score,
                                           item.answer
                                      ];
                                 })
                    },
                    {
                         type : EnumDynamicQuestion.TABLE_TRAIT,
                         key  : ["Traits", "Average Score", "Use", "Dominant"],
                         value: question.table_skill_trait.traitRows
                                 .filter((item) => item.is_top_ten)
                                 .map((item) => {

                                      return [
                                           item.name,
                                           item.score,
                                           item.answer,
                                           item.answerPositive
                                      ];
                                 })
                    }
               ]
          };
     }





     public printReport(html:string):Observable<any>
     {
          const url:string = "http://pdf.authoritti.io/";


          const params:HttpParams = new HttpParams({
               fromObject: {
                    orientation: "portrait",
                    paperSize  : "letter",
                    return_url : "true",
                    htmlContent: html,
               }
          });


          return this.http.post(url, params, {responseType: "text"});
     }





     public printReportLandscape(html:string)
     {
          const url:string = "http://pdf.authoritti.io/";


          const params:HttpParams = new HttpParams({
               fromObject: {
                    orientation: "landscape",
                    paperSize  : "letter",
                    return_url : "true",
                    htmlContent: html,
               }
          });


          return this.http.post(url, params, {responseType: "text"});
     }
}
