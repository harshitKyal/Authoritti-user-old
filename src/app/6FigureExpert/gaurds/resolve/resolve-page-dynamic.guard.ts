import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOPage} from "../../../vo/VOPage";
import {PageService} from "../../services/page.service";
import {EnumDynamicQuestion, EnumQuestion, EnumSource} from "../../../enums/Enums";
import {VOQuestion} from "../../../vo/VOQuestion";
import {VORadio} from "../../../vo/VORadio";
import {VOTableDropDown} from "../../../vo/VOTableDropDown";
import {VOCheck} from "../../../vo/VOCheck";
import {BackendService} from "../../../services/backend.service";


@Injectable({
     providedIn: 'root'
})
export class ResolvePageDynamicGuard implements Resolve<VOPage>
{
     constructor(private pageService:PageService,
                 private backendService:BackendService)
     {
     }





     resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOPage> | Promise<VOPage> | VOPage
     {
          console.log('ResolvePageDynamicGuard');


          let curPage:VOPage = this.pageService.currentPage;
          if (curPage.isShown || !curPage.questionnaire.template)
          {
               // dont reset answers on return || NoTemplate
               return curPage;
          }


          // clear existing
          curPage.questionnaire.questions.splice(0);


          switch (curPage.questionnaire.template.type)
          {
               case EnumDynamicQuestion.SLIDER:
               {
                    this.generateQuestionsSlider(curPage);
                    break;
               }


               case EnumDynamicQuestion.TABLE_YES_NO:
               {
                    this.generateQuestionsTableYesNo(curPage);
                    break;
               }


               case EnumDynamicQuestion.TABLE_DROP_DOWN:
               {
                    this.generateQuestionsTableDropDown(curPage);
                    break;
               }


               case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
               {
                    this.generateQuestionsMultiChoiceGroup(curPage);
                    break;
               }


               case EnumDynamicQuestion.TABLE_SKILL:
               {
                    this.generateQuestionsTableSkill(curPage);
                    break;
               }


               case EnumDynamicQuestion.TABLE_TRAIT:
               {
                    this.generateQuestionsTableTrait(curPage);
                    break;
               }


               case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
               {
                    this.generateQuestionsTableSkillTrait(curPage);
                    break;
               }
          }


          return curPage;
     }





     // BUG
     // multiple previousPages
     // always getting 1st question
     // assuming question will always be CHECK
     public generateQuestionsSlider(curPage:VOPage)
     {
          let prePage:VOPage = this.pageService.previousPage;
          if (!prePage)
          {
               // NoPreviousPage
               return;
          }


          let preQuestion:VOQuestion = prePage.questionnaire.questions[0];


          // get selected options
          let options = Object.keys(preQuestion.check.finalAnswer)
                  .map((id) => {
                       return preQuestion.check.options.find((item) => item.auid == id);
                  })
                  .sort((a, b) => a.name.localeCompare(b.name));


          // create questions
          for (let item of options)
          {
               let question = new VOQuestion(curPage.questionnaire.template);
               question.auid = `dynamic_${item.auid}`;
               question.title = item.name;


               curPage.questionnaire.questions.push(question);
          }


          // set answers
          this.fillAnswers(curPage);
     }





     public generateQuestionsTableYesNo(curPage:VOPage)
     {
          let prePage:VOPage = this.pageService.previousPage;
          if (!prePage)
          {
               // NoPreviousPage
               return;
          }


          // get labels
          let yesLabel:string = curPage.questionnaire.template.table_yes_no.yes_label;
          let noLabel:string = curPage.questionnaire.template.table_yes_no.no_label;


          // create row questions
          let rows = [];
          for (let itemQuestion of prePage.questionnaire.questions)
          {
               if (itemQuestion.slider.finalAnswer < itemQuestion.slider.filter)
               {
                    continue;
               }


               rows.push({
                    auid     : itemQuestion.auid,
                    name     : itemQuestion.title,
                    score    : itemQuestion.slider.finalAnswer,
                    scoreName: itemQuestion.slider.tags[itemQuestion.slider.finalAnswer - itemQuestion.slider.min_value],
                    radio    : new VORadio({
                         options: [
                              {auid: 'yes', name: yesLabel},
                              {auid: 'no', name: noLabel},
                         ]
                    })
               });
          }


          // descending order
          rows.sort((a, b) => b.score - a.score);


          // create question
          let question = new VOQuestion(curPage.questionnaire.template);
          question.auid = `dynamic_${curPage.auid}`;
          question.type = EnumDynamicQuestion.TABLE_YES_NO;
          question.table_yes_no.rows = rows;


          // add question
          curPage.questionnaire.questions.push(question);


          // set answers
          this.fillAnswers(curPage);
     }





     public generateQuestionsTableDropDown(curPage:VOPage)
     {
          let prePage:VOPage = this.pageService.previousPage;
          if (!prePage)
          {
               // NoPreviousPage
               return;
          }


          if (curPage.questionnaire.template.source == EnumSource.SLIDER)
          {
               // create row questions
               let rows = [];
               for (let itemQuestion of prePage.questionnaire.questions)
               {
                    if (itemQuestion.slider.finalAnswer < itemQuestion.slider.filter)
                    {
                         continue;
                    }


                    rows.push({
                         auid : itemQuestion.auid,
                         name : itemQuestion.title,
                         value: itemQuestion.slider.finalAnswer,
                    });
               }


               // descending order
               rows.sort((a, b) => b.value - a.value);


               // create question
               let question = new VOQuestion(curPage.questionnaire.template);
               question.auid = `dynamic_${curPage.auid}`;
               question.type = EnumDynamicQuestion.TABLE_DROP_DOWN;
               question.table_drop_down.rows = rows;


               // add question
               curPage.questionnaire.questions.push(question);


               // set answers
               this.fillAnswers(curPage);
          }


          else if (curPage.questionnaire.template.source == EnumSource.MULTI_CHOICE_GROUP)
          {
               // create row questions
               let rows = [];
               for (let itemQuestion of prePage.questionnaire.questions[0].check_group.questions)
               {
                    if (!itemQuestion.check.hasAnswer)
                    {
                         continue;
                    }


                    let options = Object.keys(itemQuestion.check.finalAnswer)
                            .map((key) => itemQuestion.check.options.find((item) => item.auid == key));


                    for (let itemOption of options)
                    {
                         rows.push({
                              auid : itemOption.auid,
                              name : itemQuestion.title,
                              value: itemOption.name
                         });
                    }
               }


               // alphabetic order
               rows.sort((a, b) => a.name.localeCompare(b.name));


               // create question
               let question = new VOQuestion(curPage.questionnaire.template);
               question.auid = `dynamic_${curPage.auid}`;
               question.type = EnumDynamicQuestion.TABLE_DROP_DOWN;
               question.table_drop_down.rows = rows;
               question.table_drop_down.options = rows.map((item, index) => {
                    return {auid: `${index}`, name: `${index + 1}`};
               });


               // add question
               curPage.questionnaire.questions.push(question);


               // set answers
               this.fillAnswers(curPage);
          }
     }





     public generateQuestionsMultiChoiceGroup(curPage:VOPage)
     {
          let prePage:VOPage = this.pageService.previousPage;
          if (!prePage)
          {
               // NoPreviousPage
               return;
          }


          // create group of rows
          let table:VOTableDropDown = prePage.questionnaire.questions[0].table_drop_down;
          let group:any = {};
          for (let itemRow of table.rows)
          {
               if (!itemRow.answer)
               {
                    // skip row without answer
                    continue;
               }


               if (!group[itemRow.answer])
               {
                    group[itemRow.answer] = [];
               }


               group[itemRow.answer].push({
                    auid: itemRow.auid,
                    name: itemRow.name
               });
          }


          // create checkGroup questions
          let questions:VOQuestion[] = Object.keys(group)
                  .map((key) => {

                       let name = table.options.find((item) => item.auid == key).name;
                       let options = group[key];


                       let question:VOQuestion = new VOQuestion()
                       question.type = EnumQuestion.MULTI_CHOICE;
                       question.title = name;
                       question.check = new VOCheck();
                       question.check.options = options;


                       return question;
                  });


          // create question
          let question = new VOQuestion(curPage.questionnaire.template);
          question.auid = `dynamic_${curPage.auid}`;
          question.type = EnumDynamicQuestion.MULTI_CHOICE_GROUP;
          question.check_group.questions = questions;


          // add question
          curPage.questionnaire.questions.push(question);


          // set answers
          this.fillAnswers(curPage);
     }





     public generateQuestionsTableSkill(curPage:VOPage)
     {
          let prePages:VOPage[] = [];
          let curPageIndex = this.pageService.currentPageIndex;


          // create question
          let question = new VOQuestion(curPage.questionnaire.template);
          question.auid = `dynamic_${question.table_skill.id}_${curPage.auid}`;
          question.type = EnumDynamicQuestion.TABLE_SKILL;


          for (let i = 0; i < curPageIndex; ++i)
          {
               let itemPage:VOPage = this.backendService.pages[i];
               if (itemPage.auid.includes(`${question.table_skill.id}_skill`))
               {
                    prePages.push(itemPage);
               }
          }
          question.table_skill.rows = this.generateSkillRows(prePages);


          // add question
          curPage.questionnaire.questions.push(question);


          // set answers
          this.fillAnswers(curPage);
     }





     public generateQuestionsTableTrait(curPage:VOPage)
     {
          let prePages:VOPage[] = [];
          let curPageIndex = this.pageService.currentPageIndex;


          // create question
          let question = new VOQuestion(curPage.questionnaire.template);
          question.auid = `dynamic_${question.table_trait.id}_${curPage.auid}`;
          question.type = EnumDynamicQuestion.TABLE_TRAIT;


          for (let i = 0; i < curPageIndex; ++i)
          {
               let itemPage:VOPage = this.backendService.pages[i];
               if (itemPage.auid.includes(`${question.table_trait.id}_trait`))
               {
                    prePages.push(itemPage);
               }
          }
          question.table_trait.rows = this.generateSkillRows(prePages);


          // add question
          curPage.questionnaire.questions.push(question);


          // set answers
          this.fillAnswers(curPage);
     }





     public generateQuestionsTableSkillTrait(curPage:VOPage)
     {
          let curPageIndex = this.pageService.currentPageIndex;


          // skills values
          let skillsPage = this.backendService.pages[curPageIndex - 2];
          let skillsOption = skillsPage.questionnaire.questions[0].table_skill.options;
          let skillsAnswer = skillsPage.questionnaire.questions[0].table_skill.columns
                  .reduce((acc, colName, i) => {

                       let option = skillsOption[i];

                       acc[option.auid] = {
                            name : colName,
                            value: option.name
                       };
                       return acc;
                  }, {});


          // create SkillRows
          let skillsRows = skillsPage.questionnaire.questions[0].table_skill.rows
                  .filter((itemRow) => {

                       if (itemRow.answer && skillsAnswer[itemRow.answer])
                       {
                            return +skillsAnswer[itemRow.answer].value >= curPage.questionnaire.template.table_skill_trait.filter;
                       }

                       return false;
                  })
                  .map((itemRow) => {

                       let answer = skillsAnswer[itemRow.answer];

                       return {
                            auid      : itemRow.auid,
                            name      : itemRow.name,
                            score     : itemRow.value,
                            value     : answer.value,
                            answer    : answer.name,
                            is_top_ten: false
                       };
                  });


          // traits values
          let traitsPage = this.backendService.pages[curPageIndex - 1];
          let traitsOption = traitsPage.questionnaire.questions[0].table_trait.options;
          let traitsAnswer = traitsPage.questionnaire.questions[0].table_trait.columns
                  .reduce((acc, item, i) => {

                       let option = traitsOption[i];

                       acc[option.auid] = {
                            name : item.name,
                            value: option.name
                       };
                       return acc;
                  }, {});


          // create TraitsRows
          let traitsRows = traitsPage.questionnaire.questions[0].table_trait.rows
                  .filter((itemRow) => {

                       if (itemRow.answer && traitsAnswer[itemRow.answer])
                       {
                            return +traitsAnswer[itemRow.answer].value >= curPage.questionnaire.template.table_skill_trait.filter;
                       }

                       return false;
                  })
                  .map((itemRow) => {

                       let answer = traitsAnswer[itemRow.answer];
                       let answerPositive = traitsAnswer[itemRow.answerPositive];
                       return {
                            auid          : itemRow.auid,
                            name          : itemRow.name,
                            score         : itemRow.value,
                            value         : answer.value,
                            answer        : answer.name,
                            answerPositive: answerPositive && answerPositive.name,
                            is_top_ten    : false
                       };
                  });


          // create question
          let question = new VOQuestion(curPage.questionnaire.template);
          question.auid = `dynamic_${question.table_skill_trait.id}_${curPage.auid}`;
          question.type = EnumDynamicQuestion.TABLE_SKILL_TRAIT;
          question.table_skill_trait.skillRows = skillsRows;
          question.table_skill_trait.traitRows = traitsRows;


          // add question
          curPage.questionnaire.questions.push(question);


          // set answers
          this.fillAnswers(curPage);
     }





     public fillAnswers(page:VOPage):void
     {
          for (let itemQuestion of page.questionnaire.questions)
          {
               itemQuestion.answer = this.pageService.answers[itemQuestion.answerId];
          }
     }





     private generateSkillRows(prePages:VOPage[])
     {
          if (!prePages.length)
          {
               // NoPreviousPage
               return [];
          }


          // create row questions
          let group = {};
          for (let itemPage of prePages)
          {
               for (let itemQuestion of itemPage.questionnaire.questions)
               {
                    if (itemQuestion.slider.finalAnswer <= 0)
                    {
                         continue;
                    }


                    if (!group[itemQuestion.auid])
                    {
                         group[itemQuestion.auid] = {
                              name : itemQuestion.title,
                              value: itemQuestion.slider.finalAnswer,
                              count: 1
                         };
                    }
                    else
                    {
                         group[itemQuestion.auid].count += 1;
                         group[itemQuestion.auid].value += itemQuestion.slider.finalAnswer;
                    }
               }
          }


          // find average
          let rows = Object.keys(group)
                  .map((key) => {

                       let item = group[key];
                       item.value = (item.value / item.count).toFixed(1);


                       return {
                            auid : key,
                            name : item.name,
                            value: item.value,
                       };
                  });


          // descending order
          rows.sort((a, b) => b.value - a.value);
          return rows;
     }
}
