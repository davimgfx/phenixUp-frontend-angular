import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { kanbanProjectsResolver } from './kanban-projects.resolver';

describe('kanbanProjectsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => kanbanProjectsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
