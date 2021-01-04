import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDeleteComponent } from './admin-order-delete.component';

describe('AdminOrderDeleteComponent', () => {
  let component: AdminOrderDeleteComponent;
  let fixture: ComponentFixture<AdminOrderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
