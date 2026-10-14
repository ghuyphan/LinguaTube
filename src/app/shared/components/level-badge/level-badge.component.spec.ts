import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { LevelBadgeComponent } from './level-badge.component';

describe('LevelBadgeComponent', () => {
  let component: LevelBadgeComponent;
  let componentRef: ComponentRef<LevelBadgeComponent>;
  let fixture: ComponentFixture<LevelBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LevelBadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should auto-derive tier from level label', () => {
    componentRef.setInput('level', 'JLPT N4');
    fixture.detectChanges();
    expect(component.effectiveTier()).toBe('elementary');

    componentRef.setInput('level', 'CEFR B1');
    fixture.detectChanges();
    expect(component.effectiveTier()).toBe('intermediate');

    componentRef.setInput('level', 'JLPT N1');
    fixture.detectChanges();
    expect(component.effectiveTier()).toBe('advanced');
  });

  it('should respect explicit tier input over derived tier', () => {
    componentRef.setInput('level', 'JLPT N4');
    componentRef.setInput('tier', 'advanced');
    fixture.detectChanges();
    expect(component.effectiveTier()).toBe('advanced');
  });

  it('should emit clicked event when clickable and clicked', () => {
    componentRef.setInput('clickable', true);
    componentRef.setInput('level', 'JLPT N5');
    fixture.detectChanges();

    let emitted = false;
    component.clicked.subscribe(() => {
      emitted = true;
    });

    const badgeEl = fixture.nativeElement.querySelector('.level-badge');
    badgeEl.click();
    expect(emitted).toBeTrue();
  });
});
