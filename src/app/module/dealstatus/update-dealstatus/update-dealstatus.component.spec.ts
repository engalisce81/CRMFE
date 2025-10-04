import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealstatusComponent } from './update-dealstatus.component';

describe('UpdateDealstatusComponent', () => {
  let component: UpdateDealstatusComponent;
  let fixture: ComponentFixture<UpdateDealstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDealstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDealstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
