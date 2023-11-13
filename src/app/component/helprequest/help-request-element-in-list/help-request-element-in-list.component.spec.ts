import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestElementInListComponent } from './help-request-element-in-list.component';

describe('HelpRequestElementInListComponent', () => {
  let component: HelpRequestElementInListComponent;
  let fixture: ComponentFixture<HelpRequestElementInListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpRequestElementInListComponent]
    });
    fixture = TestBed.createComponent(HelpRequestElementInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
