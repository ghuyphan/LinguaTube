import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'video', pathMatch: 'full' },
    {
        path: 'video',
        loadComponent: () => import('./pages/video-page/video-page.component')
            .then(m => m.VideoPageComponent)
    },
    {
        path: 'dictionary',
        loadComponent: () => import('./pages/dictionary-page/dictionary-page.component')
            .then(m => m.DictionaryPageComponent)
    },
    {
        path: 'study',
        loadComponent: () => import('./pages/study-page/study-page.component')
            .then(m => m.StudyPageComponent)
    },
    {
        path: 'history',
        loadComponent: () => import('./pages/history-page/history-page.component')
            .then(m => m.HistoryPageComponent)
    },
    { path: '**', redirectTo: 'video' }
];
