import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'video', pathMatch: 'full' },
    {
        path: 'video',
        title: 'Watch & Learn with Subtitles | Voca',
        data: {
            description: 'Watch YouTube videos with interactive dual subtitles, real-time furigana, pinyin, and instant dictionary lookups.',
            keywords: 'youtube language learning, dual subtitles, furigana, pinyin, shadow reading, learn japanese, learn chinese, learn korean'
        },
        loadComponent: () => import('./features/video/video-page/video-page.component')
            .then(m => m.VideoPageComponent)
    },
    {
        path: 'dictionary',
        title: 'Dictionary & Grammar Lookup | Voca',
        data: {
            description: 'Comprehensive multilingual dictionary and grammar pattern search for Japanese, Chinese, Korean, and English.',
            keywords: 'japanese dictionary, chinese dictionary, korean dictionary, grammar patterns, pitch accent, hanzi, kanji lookup'
        },
        loadComponent: () => import('./features/dictionary/dictionary-page/dictionary-page.component')
            .then(m => m.DictionaryPageComponent)
    },
    {
        path: 'study',
        title: 'Spaced Repetition Vocabulary Flashcards (SRS) | Voca',
        data: {
            description: 'Master foreign vocabulary with SM-2 spaced repetition flashcards, automated audio pronunciations, and memory tracking.',
            keywords: 'spaced repetition, SM-2 flashcards, vocabulary notebook, language study, memorize words'
        },
        loadComponent: () => import('./features/vocabulary/study-page/study-page.component')
            .then(m => m.StudyPageComponent)
    },
    {
        path: 'explore',
        title: 'Explore Curated Playlists & Channels | Voca',
        data: {
            description: 'Discover authentic YouTube channels and curated playlists organized by language level and topic.',
            keywords: 'language learning playlists, japanese youtube channels, chinese youtube channels, korean youtube channels'
        },
        loadComponent: () => import('./features/playlist/playlist-page/playlist-page.component')
            .then(m => m.PlaylistPageComponent)
    },
    {
        path: 'history',
        title: 'Learning History & Watch Log | Voca',
        data: {
            description: 'Track your language learning journey, resume watched videos, and review saved study progress.',
            keywords: 'learning history, watch progress, resume video'
        },
        loadComponent: () => import('./features/history/history-page/history-page.component')
            .then(m => m.HistoryPageComponent)
    },
    {
        path: 'playlists',
        redirectTo: 'explore',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: 'video' }
];
