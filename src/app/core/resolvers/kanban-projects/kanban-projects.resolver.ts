import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { KanbanService } from '../../services/kanban/kanban.service';

export const kanbanProjectsResolver: ResolveFn<any> = (route, state) => {
  return inject(KanbanService).getAllProjects();
};
