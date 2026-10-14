export interface AvatarPreset {
    id: string;
    name: string;
    url: string;
}

export const PRESET_AVATARS: readonly AvatarPreset[] = [
    { id: 'wizard', name: 'Scholar Mage', url: '/avatars/wizard.svg' },
    { id: 'knight', name: 'Guardian Knight', url: '/avatars/knight.svg' },
    { id: 'ranger', name: 'Immersion Ranger', url: '/avatars/ranger.svg' },
    { id: 'miner', name: 'Sentence Miner', url: '/avatars/miner.svg' },
    { id: 'shinobi', name: 'Shadow Shinobi', url: '/avatars/shinobi.svg' },
    { id: 'bard', name: 'Minstrel Bard', url: '/avatars/bard.svg' },
    { id: 'alchemist', name: 'Vocab Alchemist', url: '/avatars/alchemist.svg' },
    { id: 'sovereign', name: 'Mythic Sovereign', url: '/avatars/sovereign.svg' }
] as const;
