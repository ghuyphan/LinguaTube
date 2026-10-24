import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';

@Component({
  standalone: true,
  imports: [PanelComponent],
  template: `<app-panel [panelTitle]="title()" panelIcon="history" [headingLevel]="level()">
    <button panelActions (click)="cleared.set(true)">Clear history</button>
    <p>Panel content</p>
  </app-panel>`,
})
class TestPanelHostComponent {
  readonly title = signal('History');
  readonly level = signal<1 | 2>(2);
  readonly cleared = signal(false);
}

describe('Shared screen panel', () => {
  it('preserves History actions/content and supports localized page headings without nested cards', () => {
    const fixture = TestBed.createComponent(TestPanelHostComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.card').length).toBe(1);
    expect(element.querySelector('h2')?.textContent).toBe('History');
    element.querySelector<HTMLButtonElement>('.panel-header__row button')!.click();
    expect(fixture.componentInstance.cleared()).toBeTrue();
    fixture.componentInstance.title.set('履歴');
    fixture.componentInstance.level.set(1);
    fixture.detectChanges();
    expect(element.querySelector('h1')?.textContent).toBe('履歴');
    expect(element.querySelector('h2')).toBeNull();
    expect(element.querySelector('p')?.textContent).toBe('Panel content');
    fixture.destroy();
  });
});
