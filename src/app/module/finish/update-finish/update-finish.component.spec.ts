import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFinishComponent } from './update-finish.component';

describe('UpdateFinishComponent', () => {
  let component: UpdateFinishComponent;
  let fixture: ComponentFixture<UpdateFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFinishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
