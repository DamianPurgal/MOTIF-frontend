import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestAdminPanelComponent } from './help-request-admin-panel.component';

describe('HelpRequestAdminPanelComponent', () => {
  let component: HelpRequestAdminPanelComponent;
  let fixture: ComponentFixture<HelpRequestAdminPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpRequestAdminPanelComponent]
    });
    fixture = TestBed.createComponent(HelpRequestAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
