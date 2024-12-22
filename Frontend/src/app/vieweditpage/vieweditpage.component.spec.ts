import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieweditpageComponent } from './vieweditpage.component';

describe('VieweditpageComponent', () => {
  let component: VieweditpageComponent;
  let fixture: ComponentFixture<VieweditpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VieweditpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VieweditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
