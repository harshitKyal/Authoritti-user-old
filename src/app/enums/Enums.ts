//--------------------------------------------------------------------------
//
// Route
//
//--------------------------------------------------------------------------
export const EnumRoute = {
     SPLASH         : '/splash',
     LOGIN          : '/login',
     HOME           : '/home',
     USERS          : '/users',
     APPS           : '/apps',
     FINANCIAL_GOALS: '/financial-goals',

     APP_LIST                    : 'app-list',
     APP_DETAIL                  : 'app-detail',
     APP_ADD                     : 'app-add',
     APP_EDIT                    : 'app-edit',
     PAGES                       : 'pages',
     PAGE_LIST                   : 'page-list',
     INTRO_DETAIL                : 'intro-detail',
     QUESTIONNAIRE_DETAIL        : 'questionnaire-detail',
     QUESTIONNAIRE_DYNAMIC_DETAIL: 'questionnaire-dynamic-detail',
     REPORT_DETAIL               : 'report-detail',
     PAGE_ADD                    : 'page-add',
     PAGE_EDIT                   : 'page-edit',
     CATEGORIES                  : 'categories',
     CATEGORY_ADD                : 'category-add',
     CATEGORY_EDIT               : 'category-edit',
     QUESTION_ADD                : 'question-add',
     QUESTION_EDIT               : 'question-edit',
     QUESTION_DYNAMIC_ADD        : 'question-dynamic-add',
     QUESTION_DYNAMIC_EDIT       : 'question-dynamic-edit',
     START                       : 'start',
     INTRO                       : 'intro',
     QUESTIONNAIRE               : 'questionnaire',
     QUESTIONNAIRE_DYNAMIC       : 'questionnairee',
     REPORT                      : 'report',
     SECTION                     : 'section',
     GROUPS                      : 'groups',
     GROUP_ADD                   : 'group-add',
     GROUP_EDIT                  : 'group-edit',
     USER_LIST                   : 'user-list',
     USER_EDIT                   : 'user-edit',
     ANNUAL_GOAL                 : 'annual-goal',
     AVERAGE_SALE_PRICE          : 'average-sale-price',
     AVERAGE_SALE_REQUIRED       : 'average-sale-required',
     SALE_CONVERSION             : 'sale-conversion',
     LEADS_REQUIRED              : 'leads-required',
     TASKS                       : 'tasks',
     SUMMARY                     : 'summary',
     TEMPLATE                    : 'template',
     PROFESSION                  : 'profession',
     PASSION                     : 'passion',
     GOALS                       : 'goals',
     EMOTIONS                    : 'emotions',
};


//--------------------------------------------------------------------------
//
// Field
//
//--------------------------------------------------------------------------
export const EnumField = {
     LEFT_MENU       : 'left_menu',
     LOGIN_INFO      : 'login_info',
     LOGIN_INFO_ADMIN: 'login_info_admin',

     TABLE      : 'table',
     APP        : 'app',
     INFO       : 'info',
     METHOD     : 'method',
     STATUS     : 'status',
     DATA       : 'data',
     RESPONSE   : 'response',
     ENTITY_LIST: 'entityList',
     ENTITY_ID  : 'entityId',
     INDEXED_ID : 'indexedId',
     CREATED_AT : 'createdAt',
     UPDATED_AT : 'updatedAt',

     APPS               : 'apps',
     APP_ID             : 'app_id',
     APP_INFO           : 'app_info',
     PAGES              : 'pages',
     PAGE_ID            : 'page_id',
     PAGE_INFO          : 'page_info',
     CATEGORY           : 'category',
     CATEGORIES         : 'categories',
     CATEGORY_ID        : 'category_id',
     CATEGORY_INFO      : 'category_info',
     QUESTIONS          : 'questions',
     QUESTION_ID        : 'question_id',
     QUESTION_INFO      : 'question_info',
     SESSIONS           : 'sessions',
     ANSWERS            : 'answers',
     GROUPS             : 'groups',
     GROUP_ID           : 'group_id',
     GROUP_INFO         : 'group_info',
     USERS              : 'users',
     USER_ID            : 'user_id',
     TEMPLATE           : 'template',
     HIDE_TITLE         : 'hide_title',
     MULTI_COLUMN_LAYOUT: 'multi_column_layout',
     OVERRIDE_NEXT_BTN  : 'override_next_btn',
     SOURCE             : 'source',

     INTRO        : 'intro',
     QUESTIONNAIRE: 'questionnaire',
     REPORT       : 'report',
     SECTION      : 'section',

     SLIDER           : 'slider',
     TEXT_INPUT       : 'text_input',
     CHECK            : 'check',
     MULTI_TEXT_INPUT : 'multi_text_input',
     RADIO            : 'radio',
     TEXT_AREA        : 'text_area',
     TABLE_YES_NO     : 'table_yes_no',
     TABLE_DROP_DOWN  : 'table_drop_down',
     CHECK_GROUP      : 'check_group',
     TABLE_SKILL      : 'table_skill',
     TABLE_TRAIT      : 'table_trait',
     TABLE_SKILL_TRAIT: 'table_skill_trait',

     USER_ROLES : 'user_roles',
     CAN_ADD    : 'can_add',
     CAN_EDIT   : 'can_edit',
     CAN_DELETE : 'can_delete',
     CAN_REORDER: 'can_reorder',

     ID              : 'id',
     NAME            : 'name',
     ICON            : 'icon',
     URL             : 'url',
     AUID            : 'auid',
     USERNAME        : 'username',
     PASSWORD        : 'password',
     EMAIL           : 'email',
     ROLE            : 'role',
     TYPE            : 'type',
     TITLE           : 'title',
     VIDEO_LINK      : 'video_link',
     SHOW_INTRO_ICON : 'show_intro_icon',
     DESCRIPTION     : 'description',
     MIN_VALUE       : 'min_value',
     MAX_VALUE       : 'max_value',
     MIN_VALUE_LABEL : 'min_value_label',
     MAX_VALUE_LABEL : 'max_value_label',
     DEFAULT_ANSWER  : 'default_answer',
     TAGS            : 'tags',
     PLACEHOLDER     : 'placeholder',
     YES_LABEL       : 'yes_label',
     NO_LABEL        : 'no_label',
     COLUMNS         : 'columns',
     OPTIONS         : 'options',
     DIVIDE_IN_GROUPS: 'divide_in_groups',
     MAX_ANSWER_COUNT: 'max_answer_count',
     INPUTS          : 'inputs',
     ROWS            : 'rows',
     ROW             : 'row',
     INPUT           : 'input',
     HAS_OTHER       : 'has_other',
     OTHER           : 'other',
     FORMULA         : 'formula',
     CODE            : 'code',
     ACTIVE          : 'active',
     KEY             : 'key',
     VALUE           : 'value',
     FILTER          : 'filter',
     ANNUAL_GOAL     : 'annual_goal',
     PRODUCTS        : 'products',
     SALE_CONVERSION : 'sale_conversion',
     TASKS           : 'tasks',
};


//--------------------------------------------------------------------------
//
// Type
//
//--------------------------------------------------------------------------
export enum EnumType
{
     App,
     Page,
     Category,
     Question,
     Session,
     Group,
     User,
}


//--------------------------------------------------------------------------
//
// Page
//
//--------------------------------------------------------------------------
export const EnumPage = {
     INTRO                : 'intro',
     QUESTIONNAIRE        : 'questionnaire',
     QUESTIONNAIRE_DYNAMIC: 'questionnaire_dynamic',
     TEMPLATE             : 'template',
     SECTION              : 'section',
     REPORT               : 'report',
};


//--------------------------------------------------------------------------
//
// Question
//
//--------------------------------------------------------------------------
export const EnumQuestion = {
     SLIDER          : 'slider',
     TEXT_INPUT      : 'text_input',
     MULTI_CHOICE    : 'multi_choice',
     MULTI_TEXT_INPUT: 'multi_text_input',
     SINGLE_CHOICE   : 'single_choice',
     TEXT_AREA       : 'text_area',
};
export const EnumDynamicQuestion = {
     SLIDER            : 'slider',
     TABLE_YES_NO      : 'table_yes_no',
     TABLE_DROP_DOWN   : 'table_drop_down',
     MULTI_CHOICE_GROUP: 'multi_choice_group',
     TABLE_SKILL       : 'table_skill',
     TABLE_TRAIT       : 'table_trait',
     TABLE_SKILL_TRAIT : 'table_skill_trait',
};
export const EnumSource = {
     MULTI_CHOICE      : 'multi_choice',
     SLIDER            : 'slider',
     MULTI_CHOICE_GROUP: 'multi_choice_group',
     TABLE_DROP_DOWN   : 'table_drop_down',
     SKILL_TRAIT       : 'skill_trait',
};
export const EnumTemplate = {
     PROFESSION: 'profession',
     PASSION   : 'passion',
     GOALS     : 'goals',
};


//--------------------------------------------------------------------------
//
// Apps
//
//--------------------------------------------------------------------------
export const EnumApp = {
     CUSTOM         : 'custom',
     DYNAMIC        : 'dynamic',
     DYNAMIC_CUSTOM : 'dynamic_custom',
     FINANCIAL_GOALS: 'financial_goals',
     SKILLS         : '8d60124f-a9fc-4a91-8632-42734a48ebff',
     EMOTIONS       : '3fb2599d-c421-464f-90d3-e913567d6fb1',
};


//--------------------------------------------------------------------------
//
// Report
//
//--------------------------------------------------------------------------
export const EnumReport = {
     FINANCIAL_GOALS: {
          code       : 'financial_goals',
          description: '',
     },
     SIMPLE         : {
          code       : 'simple',
          description: '1- Combine all questions in a group if exists.\n' +
                       '2- Show all the questions which have answer.',
     },
     ARCHETYPE      : {
          code       : 'archetype',
          description: '1- Group all questions of each category separately.\n' +
                       '2- Calculate the sum of each group.\n' +
                       '3- Finally, show the results in Highest to Lowest order.',
     },
     DRIVER         : {
          code       : 'driver',
          description: '1- Group all questions of each category separately.\n' +
                       '2- Calculate the sum of each group.\n' +
                       '3- Find the total number of questions of all groups.\n' +
                       '4- Calculate result of each group by formula => (SumOfGroup * 10) / TotalNumberOfQuestionsFromAllGroups\n' +
                       '5- Finally, calculate \'Egotistical\' by formula => (SumOfAllGroups * 10) / TotalNumberOfQuestionsFromAllGroups',
     },
     TRAITS         : {
          code       : 'traits',
          description: '1- Group all questions of each category separately.\n' +
                       '2- Calculate the sum of each group.\n' +
                       '3- Find the total number of questions of each group.\n' +
                       '4- Calculate the result of each group by formula => (SumOfGroup / TotalNumberOfQuestionsFromGroup)\n' +
                       '5- Finally, show the results as \'Masculine\' and \'Feminine\'',
     },
     NATURAL_GIFTS  : {
          code       : 'natural_gifts',
          description: '1- Group all questions of each category separately.\n' +
                       '2- Calculate the sum of each group.\n' +
                       '3- Now, first display categorical results in Highest to Lowest order.\n' +
                       '4- Finally show all the remaining answered questions.',
     },
     EMOTIONS       : {
          code       : 'emotions',
          description: '',
     },
     SKILLS         : {
          code       : 'skills',
          description: '',
     },
};


//--------------------------------------------------------------------------
//
// Role
//
//--------------------------------------------------------------------------
export const EnumRole = {
     ADMIN: 'admin',
     USER : 'user',
};


//--------------------------------------------------------------------------
//
// CloseRate
//
//--------------------------------------------------------------------------
export const EnumCloseRate = [
     {id: '1', value: 50, name: '50% (1 in 2 Sales)'},
     {id: '2', value: 25, name: '25% (1 in 4 Sales)'},
     {id: '3', value: 10, name: '10% (1 in 10 Sales)'}
];


//--------------------------------------------------------------------------
//
// Emotions
//
//--------------------------------------------------------------------------
export const EnumPositiveEmotions = [
     {name: "Respect", value: 10},
     {name: "Pity", value: 9},
     {name: "Love", value: 8},
     {name: "Joy", value: 7},
     {name: "Hope", value: 6},
     {name: "Gratitude", value: 5},
     {name: "Freedom", value: 4},
     {name: "Faith", value: 3},
     {name: "Empathy", value: 2},
     {name: "Courage", value: 1}
];


export const EnumNegativeEmotions = [
     {name: "Anger", value: -1},
     {name: "Apathy", value: -2},
     {name: "Conceit", value: -3},
     {name: "Despair", value: -4},
     {name: "Doubt", value: -5},
     {name: "Envy", value: -6},
     {name: "Fear", value: -7},
     {name: "Greed", value: -8},
     {name: "Guilt", value: -9},
     {name: "Hate", value: -10}
];
