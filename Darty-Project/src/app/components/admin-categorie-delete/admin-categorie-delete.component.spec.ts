import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorieDeleteComponent } from './admin-categorie-delete.component';

describe('AdminCategorieDeleteComponent', () => {
  let component: AdminCategorieDeleteComponent;
  let fixture: ComponentFixture<AdminCategorieDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategorieDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategorieDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
