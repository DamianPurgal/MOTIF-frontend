import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUnauthenticatedComponent } from './navbar-unauthenticated.component';

describe('NavbarUnauthenticatedComponent', () => {
  let component: NavbarUnauthenticatedComponent;
  let fixture: ComponentFixture<NavbarUnauthenticatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarUnauthenticatedComponent]
    });
    fixture = TestBed.createComponent(NavbarUnauthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
