import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorieUpdateComponent } from './admin-categorie-update.component';

describe('AdminCategorieUpdateComponent', () => {
  let component: AdminCategorieUpdateComponent;
  let fixture: ComponentFixture<AdminCategorieUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategorieUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategorieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
