import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthTaskComponent } from './fifth-task.component';

describe('FifthTaskComponent', () => {
  let component: FifthTaskComponent;
  let fixture: ComponentFixture<FifthTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifthTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
