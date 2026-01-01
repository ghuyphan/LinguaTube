// Re-export all services from their new locations for backward compatibility

// Core services (app-wide singletons)
export * from '../core/services';

// Feature services
export * from '../features/video';
export * from '../features/dictionary';
export * from '../features/vocabulary';
export * from '../features/history';

// Remaining services still in this folder
export * from './sync.service';
export * from './translation.service';
export * from './grammar.service';
export * from './body-scroll.service';
export * from './streak.service';
