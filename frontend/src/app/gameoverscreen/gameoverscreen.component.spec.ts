import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameoverscreenComponent } from './gameoverscreen.component';

describe('GameoverscreenComponent', () => {
  let component: GameoverscreenComponent;
  let fixture: ComponentFixture<GameoverscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameoverscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameoverscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
