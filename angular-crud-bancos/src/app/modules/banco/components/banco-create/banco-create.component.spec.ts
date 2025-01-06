import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoCreateComponent } from './banco-create.component';

describe('BancoCreateComponent', () => {
  let component: BancoCreateComponent;
  let fixture: ComponentFixture<BancoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BancoCreateComponent]
    });
    fixture = TestBed.createComponent(BancoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
