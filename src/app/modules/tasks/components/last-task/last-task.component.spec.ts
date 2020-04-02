import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTaskComponent } from './last-task.component';

describe('LastTaskComponent', () => {
  let component: LastTaskComponent;
  let fixture: ComponentFixture<LastTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
