import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTableComponent } from './table.component';

describe('HTableComponent', () => {
  let component: HTableComponent;
  let fixture: ComponentFixture<HTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
