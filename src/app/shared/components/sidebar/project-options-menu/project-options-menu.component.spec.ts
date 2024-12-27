import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOptionsMenuComponent } from './project-options-menu.component';

describe('ProjectOptionsMenuComponent', () => {
  let component: ProjectOptionsMenuComponent;
  let fixture: ComponentFixture<ProjectOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOptionsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
