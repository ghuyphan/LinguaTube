import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs';

export interface RouteSeoData {
  title?: string;
  description?: string;
  keywords?: string;
}

const DEFAULT_TITLE = 'Voca - Learn Japanese, Chinese, Korean & English from YouTube';
const DEFAULT_DESCRIPTION = 'Learn Japanese, Chinese, Korean, and English by watching YouTube videos with interactive subtitles, real-time tokenization, furigana, pinyin, dictionary lookups, and SM-2 spaced repetition.';
const DEFAULT_IMAGE = 'https://lingua-tube.pages.dev/og-image.png';
const BASE_URL = 'https://lingua-tube.pages.dev';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private document = inject(DOCUMENT);

  private isCustomVideoMeta = false;

  constructor() {
    this.initRouteListener();
  }

  /**
   * Listen to router navigation to update title, meta, canonical, and OG tags
   */
  private initRouteListener(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // If user navigated away from a video or loaded a new non-video route, reset custom video meta
      if (this.isCustomVideoMeta && !this.router.url.includes('/video')) {
        this.isCustomVideoMeta = false;
      }

      if (!this.isCustomVideoMeta) {
        this.updateFromCurrentRoute();
      }
    });
  }

  /**
   * Update SEO tags based on active route config
   */
  updateFromCurrentRoute(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.snapshot.data as RouteSeoData;
    const routeTitle = route.snapshot.routeConfig?.title as string | undefined;

    const title = routeTitle || data?.title || DEFAULT_TITLE;
    const description = data?.description || DEFAULT_DESCRIPTION;
    const url = `${BASE_URL}${this.router.url.split('?')[0]}`;

    this.updateTags({
      title,
      description,
      url,
      imageUrl: DEFAULT_IMAGE,
      type: 'website',
      keywords: data?.keywords
    });
  }

  /**
   * Dynamically update SEO metadata when a YouTube video is loaded
   */
  updateVideoSeo(videoTitle: string, videoId: string, description?: string): void {
    if (!videoTitle || !videoId) return;

    this.isCustomVideoMeta = true;
    const fullTitle = `${videoTitle} | Voca - Learn Languages with YouTube`;
    const desc = description
      ? `${description.slice(0, 150)}... Learn Japanese, Chinese, Korean, or English with interactive subtitles on Voca.`
      : `Watch "${videoTitle}" with interactive dual subtitles, furigana, pinyin, and instant dictionary lookups on Voca.`;
    const videoUrl = `${BASE_URL}/video?v=${videoId}`;
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    this.updateTags({
      title: fullTitle,
      description: desc,
      url: videoUrl,
      imageUrl: thumbnailUrl,
      type: 'video.other',
      keywords: `learn languages with youtube, ${videoTitle}, interactive subtitles, dual subtitles`
    });
  }

  /**
   * Reset custom video metadata back to route default
   */
  resetVideoSeo(): void {
    this.isCustomVideoMeta = false;
    this.updateFromCurrentRoute();
  }

  /**
   * Core method to update DOM title, meta tags, and canonical link
   */
  private updateTags(config: {
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    type: 'website' | 'video.other';
    keywords?: string;
  }): void {
    // 1. Document Title
    this.titleService.setTitle(config.title);

    // 2. Standard Meta
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // 3. Open Graph
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: config.url });
    this.metaService.updateTag({ property: 'og:image', content: config.imageUrl });
    this.metaService.updateTag({ property: 'og:type', content: config.type });

    // 4. Twitter Cards
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.imageUrl });

    // 5. Canonical Link
    this.updateCanonicalUrl(config.url);
  }

  /**
   * Update or create the canonical <link rel="canonical"> element
   */
  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }
}
