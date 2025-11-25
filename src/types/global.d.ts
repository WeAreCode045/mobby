import type { PluginBootstrapData } from './plugin';

declare global {
  interface Window {
    mobileBottomBarData?: PluginBootstrapData;
  }
}

export {};
