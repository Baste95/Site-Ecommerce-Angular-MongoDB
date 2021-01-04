import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorieCreateComponent } from './admin-categorie-create.component';

describe('AdminCategorieCreateComponent', () => {
  let component: AdminCategorieCreateComponent;
  let fixture: ComponentFixture<AdminCategorieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategorieCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategorieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
