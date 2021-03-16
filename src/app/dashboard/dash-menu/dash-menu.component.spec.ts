import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMenuComponent } from './dash-menu.component';

describe('DashMenuComponent', () => {
  let component: DashMenuComponent;
  let fixture: ComponentFixture<DashMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
