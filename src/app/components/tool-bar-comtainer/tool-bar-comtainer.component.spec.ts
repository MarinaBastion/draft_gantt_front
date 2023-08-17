import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarComtainerComponent } from './tool-bar-comtainer.component';

describe('ToolBarComtainerComponent', () => {
  let component: ToolBarComtainerComponent;
  let fixture: ComponentFixture<ToolBarComtainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarComtainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarComtainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
