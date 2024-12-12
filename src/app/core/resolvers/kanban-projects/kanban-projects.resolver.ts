import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { KanbanService } from '../../services/kanban/kanban.service';
import { TokenService } from '../../services/token/token.service';

export const kanbanProjectsResolver: ResolveFn<any> = (route, state) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (token) {
    const kanbanService = inject(KanbanService);
    return kanbanService.getAllProjects(token); 
  } else {
    return []; 
  }
};
