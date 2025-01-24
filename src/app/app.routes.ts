import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { kanbanProjectsResolver } from './core/resolvers/kanban-projects/kanban-projects.resolver';
import { AUTH, KANBAN } from './core/models/constants-routing';
import { ModalColorsProjectComponent } from './shared/components/sidebar/modal-colors-project/modal-colors-project.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: AUTH.LOGIN,
    component: LoginComponent,
  },
  {
    path: AUTH.REGISTER,
    component: RegisterComponent,
  },
  {
    path: KANBAN.ROOT,
    component: KanbanComponent,
    resolve: {
      projects: kanbanProjectsResolver,
    },
  },
];
