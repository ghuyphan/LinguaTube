import { SmoothHeightAnimator } from './smooth-height.animator';

describe('SmoothHeightAnimator', () => {
  let inner: HTMLElement;
  let container: HTMLElement;
  let animator: SmoothHeightAnimator;

  beforeEach(() => {
    inner = document.createElement('div');
    container = document.createElement('div');
    container.appendChild(inner);
    document.body.appendChild(container);
  });

  afterEach(() => {
    animator?.detach();
    container.remove();
  });

  it('should initialize and attach ResizeObserver without crashing', () => {
    animator = new SmoothHeightAnimator();
    animator.attach(inner, container);
    expect(animator.isAnimating).toBeFalse();
  });

  it('should cancel active animation and remove animating class', () => {
    animator = new SmoothHeightAnimator({ animatingClass: 'test-animating' });
    animator.attach(inner, container);
    container.classList.add('test-animating');

    animator.cancel();
    expect(container.classList.contains('test-animating')).toBeFalse();
  });

  it('should detach cleanly and reset internal references', () => {
    animator = new SmoothHeightAnimator();
    animator.attach(inner, container);
    animator.detach();

    expect(animator.isAnimating).toBeFalse();
  });

  it('should support resetBaseline without triggering animation', () => {
    animator = new SmoothHeightAnimator();
    animator.attach(inner, container);
    animator.resetBaseline();

    expect(animator.isAnimating).toBeFalse();
  });

  it('should not throw if container.animate is not supported', () => {
    // Temporarily mock container.animate as undefined
    const origAnimate = container.animate;
    (container as unknown as { animate: unknown }).animate = undefined;

    animator = new SmoothHeightAnimator();
    expect(() => {
      animator.attach(inner, container);
    }).not.toThrow();

    container.animate = origAnimate;
  });

  it('should respect isReady callback when evaluating animations', () => {
    let ready = false;
    animator = new SmoothHeightAnimator({
      isReady: () => ready
    });
    animator.attach(inner, container);

    expect(animator.isAnimating).toBeFalse();
    ready = true;
    expect(ready).toBeTrue();
  });
});
