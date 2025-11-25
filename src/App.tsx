import { useMemo, useState } from 'react';
import { MobileBottomBarSettings } from './components/MobileBottomBarSettings';
import { MobilePreview } from './components/MobilePreview';
import { LayoutSelector } from './components/LayoutSelector';
import { IconTextCustomization } from './components/IconTextCustomization';
import type { MenuOption, MobileBarSettingsPayload, PluginBootstrapData } from './types/plugin';

const defaultMenus: MenuOption[] = [
  { id: 'primary-menu', name: 'Primary Menu' },
  { id: 'footer-menu', name: 'Footer Menu' },
  { id: 'mobile-menu', name: 'Mobile Menu' },
  { id: 'quick-links', name: 'Quick Links' },
];

function getBootstrapData(): PluginBootstrapData {
  if (typeof window === 'undefined') {
    return {};
  }
  return window.mobileBottomBarData ?? {};
}

export default function App() {
  const pluginData = getBootstrapData();
  const menus = (pluginData.menus && pluginData.menus.length > 0 ? pluginData.menus : defaultMenus) ?? defaultMenus;
  const initialSettings: MobileBarSettingsPayload = {
    enabled: pluginData.settings?.enabled ?? false,
    selectedMenu: pluginData.settings?.selectedMenu ?? menus[0]?.id ?? 'primary-menu',
    barStyle: pluginData.settings?.barStyle ?? 'dark',
    accentColor: pluginData.settings?.accentColor ?? '#6366f1',
    showLabels: pluginData.settings?.showLabels ?? true,
    layout: pluginData.settings?.layout ?? 'standard',
    iconSize: pluginData.settings?.iconSize ?? 20,
    iconColor: pluginData.settings?.iconColor ?? '#9ca3af',
    textSize: pluginData.settings?.textSize ?? 12,
    textWeight: pluginData.settings?.textWeight ?? '400',
    textFont: pluginData.settings?.textFont ?? 'system-ui',
    textColor: pluginData.settings?.textColor ?? '#6b7280',
  };

  const [enabled, setEnabled] = useState(initialSettings.enabled);
  const [selectedMenu, setSelectedMenu] = useState(initialSettings.selectedMenu);
  const [barStyle, setBarStyle] = useState<'light' | 'dark'>(initialSettings.barStyle);
  const [accentColor, setAccentColor] = useState(initialSettings.accentColor);
  const [showLabels, setShowLabels] = useState(initialSettings.showLabels);
  const [layout, setLayout] = useState(initialSettings.layout);
  const [iconSize, setIconSize] = useState(initialSettings.iconSize);
  const [iconColor, setIconColor] = useState(initialSettings.iconColor);
  const [textSize, setTextSize] = useState(initialSettings.textSize);
  const [textWeight, setTextWeight] = useState(initialSettings.textWeight);
  const [textFont, setTextFont] = useState(initialSettings.textFont);
  const [textColor, setTextColor] = useState(initialSettings.textColor);
  const [status, setStatus] = useState<{ state: 'idle' | 'saving' | 'success' | 'error'; message?: string }>(
    { state: 'idle' },
  );

  const canPersist = Boolean(pluginData.restUrl && pluginData.nonce);
  const payload: MobileBarSettingsPayload = {
    enabled,
    selectedMenu,
    barStyle,
    accentColor,
    showLabels,
    layout,
    iconSize,
    iconColor,
    textSize,
    textWeight,
    textFont,
    textColor,
  };

  const handleSave = async () => {
    if (!canPersist) {
      setStatus({ state: 'error', message: 'Saving is only available when the plugin runs inside WordPress.' });
      return;
    }

    setStatus({ state: 'saving', message: 'Saving changes…' });

    try {
      const response = await fetch(pluginData.restUrl as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': pluginData.nonce as string,
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const errorMessage = body?.message ?? 'Unable to save changes.';
        throw new Error(errorMessage);
      }

      setStatus({ state: 'success', message: 'Settings saved successfully.' });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Unable to save changes.',
      });
    }
  };

  const statusColor = useMemo(() => {
    switch (status.state) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'saving':
        return 'text-gray-700';
      default:
        return 'text-gray-500';
    }
  }, [status.state]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* WordPress Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-800">Mobile Bottom Bar Settings</h1>
        <p className="text-gray-600 mt-1">Configure your mobile navigation bar</p>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <MobileBottomBarSettings
              enabled={enabled}
              onEnabledChange={setEnabled}
              selectedMenu={selectedMenu}
              onMenuChange={setSelectedMenu}
              menus={menus}
              barStyle={barStyle}
              onStyleChange={setBarStyle}
              accentColor={accentColor}
              onAccentColorChange={setAccentColor}
              showLabels={showLabels}
              onShowLabelsChange={setShowLabels}
              layout={layout}
              onLayoutChange={setLayout}
              iconSize={iconSize}
              onIconSizeChange={setIconSize}
              iconColor={iconColor}
              onIconColorChange={setIconColor}
              textSize={textSize}
              onTextSizeChange={setTextSize}
              textWeight={textWeight}
              onTextWeightChange={setTextWeight}
              textFont={textFont}
              onTextFontChange={setTextFont}
              textColor={textColor}
              onTextColorChange={setTextColor}
            />
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <LayoutSelector
                selectedLayout={layout}
                onLayoutChange={setLayout}
                accentColor={accentColor}
                isDark={barStyle === 'dark'}
              />
            </div>
            
            <IconTextCustomization
              iconSize={iconSize}
              onIconSizeChange={setIconSize}
              iconColor={iconColor}
              onIconColorChange={setIconColor}
              textSize={textSize}
              onTextSizeChange={setTextSize}
              textWeight={textWeight}
              onTextWeightChange={setTextWeight}
              textFont={textFont}
              onTextFontChange={setTextFont}
              textColor={textColor}
              onTextColorChange={setTextColor}
            />
          </div>

          {/* Preview Panel */}
          <MobilePreview
            selectedMenu={selectedMenu}
            barStyle={barStyle}
            accentColor={accentColor}
            showLabels={showLabels}
            layout={layout}
            iconSize={iconSize}
            iconColor={iconColor}
            textSize={textSize}
            textWeight={textWeight}
            textFont={textFont}
            textColor={textColor}
          />
        </div>

        {/* Save Button */}
        <div className="mt-6 flex flex-col gap-2 items-end">
          <button
            onClick={handleSave}
            disabled={!canPersist || status.state === 'saving'}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.state === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>
          {status.message && (
            <p className={`${statusColor} text-sm`} aria-live="polite">
              {status.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}