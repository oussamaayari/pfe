import { AppUserComponent } from './views/app-user/app-user.component';
import { EntretienListComponent } from './views/entretien-list/entretien-list.component';
import { EntretienComponent } from './views/entretien/entretien.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { QuestionComponent } from './views/question/question.component';
import { AppUserListComponent } from './views/app-user-list/app-user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'badcredentials',
    component: LoginComponent,
    data: {
      title: 'badcredentials'

    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'app-user-list',
        component: AppUserListComponent,
        data: {
          title: 'app-user-list'

        }
      },
      {
        path: 'app-user',
        component: AppUserComponent,
        data: {
          title: 'app-user'

        }
      },
      {
        path: 'question',
        component: QuestionComponent,
        data: {
          title: 'question'

        }
      },
      {
        path: 'reponse',
        component: QuestionComponent,
        data: {
          title: 'reponse'

        }
      },


      {
        path: 'entretien',
        component: EntretienComponent,
        data: {
          title: 'entretien'

        }
      },

      {
        path: 'entretien-List',
        component: EntretienListComponent,
        data: {
          title: 'entretien-List'

        }
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
