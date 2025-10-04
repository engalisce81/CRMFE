import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDealstatusComponent } from './create-dealstatus.component';

describe('CreateDealstatusComponent', () => {
  let component: CreateDealstatusComponent;
  let fixture: ComponentFixture<CreateDealstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDealstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDealstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
