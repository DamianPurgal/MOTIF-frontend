import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestComponent } from './help-request.component';

describe('HelpRequestComponent', () => {
  let component: HelpRequestComponent;
  let fixture: ComponentFixture<HelpRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpRequestComponent]
    });
    fixture = TestBed.createComponent(HelpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
