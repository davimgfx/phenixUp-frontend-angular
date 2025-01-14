import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColorsProjectComponent } from './modal-colors-project.component';

describe('ModalColorsProjectComponent', () => {
  let component: ModalColorsProjectComponent;
  let fixture: ComponentFixture<ModalColorsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalColorsProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColorsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
