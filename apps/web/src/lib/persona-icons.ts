import { valueIcons, type ValueIconKey } from './value-icons';

const personaIconKeys: Record<string, ValueIconKey> = {
  school: 'relationships',
  leadership: 'empower',
  teaching: 'growth',
  support: 'relationships',
  global: 'team',
  community: 'team',
};

export function personaIconForKey(key?: string | null) {
  const resolved = personaIconKeys[key ?? 'school'] ?? 'relationships';
  return valueIcons[resolved];
}
