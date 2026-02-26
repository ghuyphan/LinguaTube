import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'video', pathMatch: 'full' },
    {
        path: 'video',
        loadComponent: () => import('./features/video/video-page/video-page.component')
            .then(m => m.VideoPageComponent)
    },
    {
        path: 'dictionary',
        loadComponent: () => import('./features/dictionary/dictionary-page/dictionary-page.component')
            .then(m => m.DictionaryPageComponent)
    },
    {
        path: 'study',
        loadComponent: () => import('./features/vocabulary/study-page/study-page.component')
            .then(m => m.StudyPageComponent)
    },
    {
        path: 'history',
        loadComponent: () => import('./features/history/history-page/history-page.component')
            .then(m => m.HistoryPageComponent)
    },
    {
        path: 'playlists',
        loadComponent: () => import('./features/playlist/playlist-page/playlist-page.component')
            .then(m => m.PlaylistPageComponent)
    },
    {
        path: 'game',
        children: [
            {
                path: 'lobby',
                loadComponent: () => import('./features/multiplayer-game/game-lobby/game-lobby.component')
                    .then(m => m.GameLobbyComponent)
            },
            {
                path: 'barista',
                loadComponent: () => import('./features/multiplayer-game/barista-view/barista-view.component')
                    .then(m => m.BaristaViewComponent)
            },
            {
                path: 'customer',
                loadComponent: () => import('./features/multiplayer-game/customer-view/customer-view.component')
                    .then(m => m.CustomerViewComponent)
            },
            { path: '', redirectTo: 'lobby', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'video' }
];
