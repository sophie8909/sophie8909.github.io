import type { LanguageCode } from '../i18n/config';
import creationsData from './creations.json';

export type LocalizedCreationText = Record<LanguageCode, string>;

export interface CreationButton {
  label: LocalizedCreationText;
  href: string | null;
  clickable: boolean;
}

export interface Creation {
  id: string;
  title: LocalizedCreationText;
  subtitle: LocalizedCreationText;
  description: LocalizedCreationText;
  buttons: CreationButton[];
}

export const creations = creationsData as Creation[];
