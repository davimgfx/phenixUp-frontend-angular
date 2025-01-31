import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChooseProjectComponent } from './modal-choose-project.component';

describe('ModalChooseProjectComponent', () => {
  let component: ModalChooseProjectComponent;
  let fixture: ComponentFixture<ModalChooseProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalChooseProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChooseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
