import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';

@Component({
  standalone: true,
  imports: [SwitchComponent],
  template: `<app-switch [checked]="confirmed()" [disabled]="disabled()" label="Profile visibility" (checkedChange)="requested.set($event)" />`,
})
class TestSwitchHostComponent {
  readonly confirmed = signal(false);
  readonly requested = signal<boolean | null>(null);
  readonly disabled = signal(false);
}

describe('Shared controlled switch', () => {
  it('emits intent once and leaves rejected asynchronous updates at the confirmed value', () => {
    const fixture = TestBed.createComponent(TestSwitchHostComponent);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.requested()).toBeTrue();
    expect(input.checked).toBeFalse();
    fixture.componentInstance.confirmed.set(true);
    fixture.detectChanges();
    expect(input.checked).toBeTrue();
    expect(fixture.componentInstance.requested()).toBeTrue();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(input.disabled).toBeTrue();
    fixture.destroy();
  });
});
