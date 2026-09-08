import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet.component';
import { BottomSheetService } from '../../../services/bottom-sheet.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  standalone: true,
  imports: [BottomSheetComponent],
  template: `
    <app-bottom-sheet
      [isOpen]="isOpen"
      [title]="title"
      [showCloseButton]="showCloseButton"
      [showDragHandle]="showDragHandle"
      (closed)="onClosed()"
    >
      <div class="test-content" [style.height.px]="contentHeight">
        <p>Test content line</p>
      </div>
    </app-bottom-sheet>
  `
})
class TestHostComponent {
  isOpen = false;
  title = 'Test Modal';
  showCloseButton = true;
  showDragHandle = true;
  contentHeight = 100;
  closedCalled = false;

  onClosed(): void {
    this.closedCalled = true;
  }
}

describe('BottomSheetComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let bottomSheetService: BottomSheetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, BottomSheetComponent],
      providers: [BottomSheetService, I18nService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    bottomSheetService = TestBed.inject(BottomSheetService);
  });

  afterEach(() => {
    fixture.destroy();
    bottomSheetService.closeAll();
  });

  it('should not render DOM when isOpen is false', () => {
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.sheet-overlay');
    expect(overlay).toBeNull();
  });

  it('should render modal dialog with inner content container when isOpen is true', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const hostEl = fixture.nativeElement as HTMLElement;
    const overlay = hostEl.querySelector('.sheet-overlay') as HTMLElement;
    const sheet = hostEl.querySelector('.sheet') as HTMLElement;
    const innerWrapper = hostEl.querySelector('.sheet-content-inner') as HTMLElement;
    const closeBtn = hostEl.querySelector('.sheet-close-btn') as HTMLElement;

    expect(overlay).toBeTruthy();
    expect(sheet).toBeTruthy();
    expect(innerWrapper).toBeTruthy();
    expect(closeBtn).toBeTruthy();
    expect(sheet.getAttribute('role')).toBe('dialog');
    expect(sheet.getAttribute('aria-modal')).toBe('true');
  });

  it('should apply desktop-modal styling when on desktop viewport', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const sheet = fixture.nativeElement.querySelector('.sheet') as HTMLElement;
    // In typical test browser window (width > 768), desktop-modal is applied
    if (window.innerWidth > 768 && window.innerHeight > 500) {
      expect(sheet.classList.contains('desktop-modal')).toBeTrue();
    }
  });

  it('should emit closed output and unregister when close button is clicked', fakeAsync(() => {
    host.isOpen = true;
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('.sheet-close-btn') as HTMLElement;
    expect(closeBtn).toBeTruthy();

    closeBtn.click();
    fixture.detectChanges();

    // 250ms animation duration
    tick(300);
    fixture.detectChanges();

    expect(host.closedCalled).toBeTrue();
    expect(bottomSheetService.hasOpenSheets).toBeFalse();
  }));

  it('should close when backdrop is clicked if allowBackdropClose is true', fakeAsync(() => {
    host.isOpen = true;
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.sheet-overlay') as HTMLElement;
    expect(overlay).toBeTruthy();

    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    tick(300);
    fixture.detectChanges();

    expect(host.closedCalled).toBeTrue();
  }));

  it('should close on Escape key press via BottomSheetService', fakeAsync(() => {
    host.isOpen = true;
    fixture.detectChanges();

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    fixture.detectChanges();

    tick(300);
    fixture.detectChanges();

    expect(host.closedCalled).toBeTrue();
  }));

  it('should handle clean teardown when component is destroyed while open', () => {
    host.isOpen = true;
    fixture.detectChanges();

    expect(bottomSheetService.hasOpenSheets).toBeTrue();

    fixture.destroy();
    expect(bottomSheetService.hasOpenSheets).toBeFalse();
  });
});
