import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinishComponent } from './list-finish.component';

describe('ListFinishComponent', () => {
  let component: ListFinishComponent;
  let fixture: ComponentFixture<ListFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFinishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
