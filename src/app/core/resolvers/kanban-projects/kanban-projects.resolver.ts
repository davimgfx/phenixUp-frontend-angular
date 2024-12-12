import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { KanbanService } from '../../services/kanban/kanban.service';
import { TokenService } from '../../services/token/token.service';

export const kanbanProjectsResolver: ResolveFn<any> = (route, state) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();
  const clientId = tokenService.decodeToken().id;

  if (token && clientId) {
    const kanbanService = inject(KanbanService);
    return kanbanService.getAllProjects(token, clientId); 
  } else {
    return []; 
  }
};
