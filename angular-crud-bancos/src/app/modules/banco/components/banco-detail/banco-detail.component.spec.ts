import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoDetailComponent } from './banco-detail.component';

describe('BancoDetailComponent', () => {
  let component: BancoDetailComponent;
  let fixture: ComponentFixture<BancoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BancoDetailComponent]
    });
    fixture = TestBed.createComponent(BancoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
