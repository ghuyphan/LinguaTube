import type { IconName } from '../../shared/components/icon/icon.component';
import type { LandingCopyKey } from '../../features/landing/landing.i18n';

export type DownloadPlatformId = 'google_play' | 'app_store' | 'android_apk';

export type DownloadAvailabilityStatus = 'live' | 'release' | 'coming_soon';

export interface AppDownloadTarget {
  id: DownloadPlatformId;
  platform: 'android' | 'ios';
  /** Android applicationId / iOS bundle identifier */
  packageOrBundleId: string;
  /** Published Play Store, App Store, or APK release URL; null marks the channel as coming soon */
  url: string | null;
  status: DownloadAvailabilityStatus;
  titleKey: LandingCopyKey;
  subtitleKey: LandingCopyKey;
  ctaKey: LandingCopyKey;
  badgeKey: LandingCopyKey;
  icon: IconName;
}

/**
 * Centralized Flutter mobile app download configuration.
 * Paste published Google Play / App Store URLs and flip `status` to `'live'` when store reviews complete.
 */
export const APP_DOWNLOAD_TARGETS: readonly AppDownloadTarget[] = [
  {
    id: 'google_play',
    platform: 'android',
    packageOrBundleId: 'com.voca.voca_flutter',
    url: null,
    status: 'coming_soon',
    titleKey: 'downloadPlayTitle',
    subtitleKey: 'downloadPlaySubtitle',
    ctaKey: 'downloadPlayCta',
    badgeKey: 'downloadComingSoon',
    icon: 'play-circle'
  },
  {
    id: 'app_store',
    platform: 'ios',
    packageOrBundleId: 'com.voca.voca_flutter',
    url: null,
    status: 'coming_soon',
    titleKey: 'downloadAppStoreTitle',
    subtitleKey: 'downloadAppStoreSubtitle',
    ctaKey: 'downloadAppStoreCta',
    badgeKey: 'downloadComingSoon',
    icon: 'cloud'
  },
  {
    id: 'android_apk',
    platform: 'android',
    packageOrBundleId: 'com.voca.voca_flutter',
    url: 'https://github.com/ghuyphan/voca-flutter/releases',
    status: 'release',
    titleKey: 'downloadApkTitle',
    subtitleKey: 'downloadApkSubtitle',
    ctaKey: 'downloadApkCta',
    badgeKey: 'downloadDirectRelease',
    icon: 'download'
  }
];
