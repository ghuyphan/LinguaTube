export interface AvatarPreset {
    id: string;
    name: string;
    url: string;
}

export const PRESET_AVATARS: readonly AvatarPreset[] = [
    { id: 'cat', name: 'Cat', url: '/avatars/cat.svg' },
    { id: 'dog', name: 'Dog', url: '/avatars/dog.svg' },
    { id: 'fox', name: 'Fox', url: '/avatars/fox.svg' },
    { id: 'panda', name: 'Panda', url: '/avatars/panda.svg' },
    { id: 'owl', name: 'Owl', url: '/avatars/owl.svg' },
    { id: 'rabbit', name: 'Rabbit', url: '/avatars/rabbit.svg' },
    { id: 'ninja', name: 'Ninja', url: '/avatars/ninja.svg' },
    { id: 'robot', name: 'Robot', url: '/avatars/robot.svg' }
] as const;
