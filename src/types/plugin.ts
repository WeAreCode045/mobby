export interface MenuOption {
  id: string;
  name: string;
}

export interface MobileBarSettingsPayload {
  enabled: boolean;
  selectedMenu: string;
  barStyle: 'light' | 'dark';
  accentColor: string;
  showLabels: boolean;
  layout: string;
  iconSize: number;
  iconColor: string;
  textSize: number;
  textWeight: string;
  textFont: string;
  textColor: string;
}

export interface PluginBootstrapData {
  restUrl?: string;
  nonce?: string;
  menus?: MenuOption[];
  settings?: Partial<MobileBarSettingsPayload>;
}
