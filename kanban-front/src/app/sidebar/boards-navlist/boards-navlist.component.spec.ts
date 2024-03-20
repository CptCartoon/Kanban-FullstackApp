import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsNavlistComponent } from './boards-navlist.component';

describe('BoardsNavlistComponent', () => {
  let component: BoardsNavlistComponent;
  let fixture: ComponentFixture<BoardsNavlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsNavlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardsNavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
