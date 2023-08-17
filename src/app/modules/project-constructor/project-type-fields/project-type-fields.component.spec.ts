import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeFieldsComponent } from './project-type-fields.component';

describe('ProjectTypeFieldsComponent', () => {
  let component: ProjectTypeFieldsComponent;
  let fixture: ComponentFixture<ProjectTypeFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
