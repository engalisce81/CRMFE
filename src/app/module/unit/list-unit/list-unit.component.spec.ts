import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitComponent } from './list-unit.component';

describe('ListUnitComponent', () => {
  let component: ListUnitComponent;
  let fixture: ComponentFixture<ListUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
