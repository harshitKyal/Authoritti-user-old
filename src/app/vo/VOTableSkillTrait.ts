import {EnumField} from "../enums/Enums";


interface TableSkillTrait
{
     auid:string,
     name:string,
     score:number,
     value:number,
     answer:string,
     answerPositive?:string,
     is_top_ten:boolean
}


export class VOTableSkillTrait
{
     public id:string;
     public filter:number;
     public skillRows:TableSkillTrait[];
     public traitRows:TableSkillTrait[];





     constructor(init?:Partial<any>)
     {
          if (init)
          {
               this.id = init[EnumField.ID];
               this.filter = +init[EnumField.FILTER];
          }
     }





     public get finalAnswer():any
     {
          let topSkills:any = this.skillRows
                  .filter((item) => item.is_top_ten)
                  .reduce((acc, item) => {
                       acc[item.auid] = item.is_top_ten;
                       return acc;
                  }, {});


          let topTraits:any = this.traitRows
                  .filter((item) => item.is_top_ten)
                  .reduce((acc, item) => {
                       acc[item.auid] = item.is_top_ten;
                       return acc;
                  }, {});


          return {
               topSkills: topSkills,
               topTraits: topTraits,
          };
     }





     public set finalAnswer(value)
     {
          let topSkills:any = (value && value["topSkills"]) || {};
          let topTraits:any = (value && value["topTraits"]) || {};


          for (let itemRow of this.skillRows)
          {
               itemRow.is_top_ten = topSkills[itemRow.auid];
          }
          for (let itemRow of this.traitRows)
          {
               itemRow.is_top_ten = topTraits[itemRow.auid];
          }
     }





     public get hasAnswer():boolean
     {
          for (let item of this.skillRows)
          {
               if (item.is_top_ten)
               {
                    return true;
               }
          }


          for (let item of this.traitRows)
          {
               if (item.is_top_ten)
               {
                    return true;
               }
          }


          return false;
     }





     public reset():void
     {
          for (let item of this.skillRows)
          {
               item.is_top_ten = false;
          }
          for (let item of this.traitRows)
          {
               item.is_top_ten = false;
          }
     }
}
