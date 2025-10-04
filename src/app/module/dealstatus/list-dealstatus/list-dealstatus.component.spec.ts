import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDealstatusComponent } from './list-dealstatus.component';

describe('ListDealstatusComponent', () => {
  let component: ListDealstatusComponent;
  let fixture: ComponentFixture<ListDealstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDealstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDealstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
