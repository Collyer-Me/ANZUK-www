import type { ImageMetadata } from 'astro';
import attitude from '@anzuk/brand/assets/icons/values/attitude.svg';
import belief from '@anzuk/brand/assets/icons/values/belief.svg';
import empower from '@anzuk/brand/assets/icons/values/empower.svg';
import equity from '@anzuk/brand/assets/icons/values/equity.svg';
import growth from '@anzuk/brand/assets/icons/values/growth.svg';
import relationships from '@anzuk/brand/assets/icons/values/relationships.svg';
import team from '@anzuk/brand/assets/icons/values/team.svg';
import type { DemoValueIconKey } from '../../data/demo-content';

export const valueIcons: Record<DemoValueIconKey, ImageMetadata> = {
  belief,
  equity,
  growth,
  relationships,
  empower,
  attitude,
  team,
};
