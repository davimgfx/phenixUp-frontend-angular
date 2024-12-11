import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { kanbanProjectsResolver } from './core/resolvers/kanban-projects/kanban-projects.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: "kanban",
    component: KanbanComponent,
    resolve: {
      projects: kanbanProjectsResolver,
    }
  }
];
