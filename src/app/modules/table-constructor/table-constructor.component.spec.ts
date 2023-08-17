import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConstructorComponent } from './table-constructor.component';

describe('TableConstructorComponent', () => {
  let component: TableConstructorComponent;
  let fixture: ComponentFixture<TableConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableConstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
