import type { ChangeEvent } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import type { MenuOption } from '../types/plugin';

interface MobileBottomBarSettingsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  selectedMenu: string;
  onMenuChange: (menu: string) => void;
  menus: MenuOption[];
  barStyle: 'light' | 'dark';
  onStyleChange: (style: 'light' | 'dark') => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  showLabels: boolean;
  onShowLabelsChange: (show: boolean) => void;
  layout: string;
  onLayoutChange: (layout: string) => void;
  iconSize: number;
  onIconSizeChange: (size: number) => void;
  iconColor: string;
  onIconColorChange: (color: string) => void;
  textSize: number;
  onTextSizeChange: (size: number) => void;
  textWeight: string;
  onTextWeightChange: (weight: string) => void;
  textFont: string;
  onTextFontChange: (font: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
}

const colorPresets = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Green', value: '#10b981' },
];

export function MobileBottomBarSettings({
  enabled,
  onEnabledChange,
  selectedMenu,
  onMenuChange,
  menus,
  barStyle,
  onStyleChange,
  accentColor,
  onAccentColorChange,
  showLabels,
  onShowLabelsChange,
  layout,
  onLayoutChange,
  iconSize,
  onIconSizeChange,
  iconColor,
  onIconColorChange,
  textSize,
  onTextSizeChange,
  textWeight,
  onTextWeightChange,
  textFont,
  onTextFontChange,
  textColor,
  onTextColorChange,
}: MobileBottomBarSettingsProps) {
  const hasMenus = menus.length > 0;
  const menuValue = hasMenus ? selectedMenu : '';
  return (
    <Card className="p-6">
      <h2 className="text-gray-900 mb-6">Configuration</h2>

      <div className="space-y-4">
        {/* Activation Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div>
            <Label className="text-gray-900">Activate Bottom Bar</Label>
            <p className="text-gray-600 text-sm">Show the bar on screens smaller than 768px across your site.</p>
          </div>
          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </div>

        {/* Menu Selection */}
        <div>
          <Label htmlFor="menu-select" className="text-gray-700 mb-2 block">
            Select Menu
          </Label>
          <select
            id="menu-select"
            value={menuValue}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => onMenuChange(event.target.value)}
            disabled={!hasMenus}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          >
            {hasMenus ? (
              menus.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))
            ) : (
              <option value="">No menus found</option>
            )}
          </select>
          <p className="text-gray-500 text-sm mt-1">
            {hasMenus
              ? 'Choose which WordPress menu to display in the mobile bottom bar'
              : 'Create a menu under Appearance → Menus to enable selection'}
          </p>
        </div>

        {/* Bar Style */}
        <div>
          <Label className="text-gray-700 mb-2 block">Bar Style</Label>
          <div className="flex gap-3">
            <button
              onClick={() => onStyleChange('light')}
              className={`flex-1 px-4 py-3 rounded-md border-2 transition-all ${
                barStyle === 'light'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-white border border-gray-300 rounded"></div>
                <span className="text-gray-900">Light</span>
              </div>
            </button>
            <button
              onClick={() => onStyleChange('dark')}
              className={`flex-1 px-4 py-3 rounded-md border-2 transition-all ${
                barStyle === 'dark'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-gray-900 border border-gray-700 rounded"></div>
                <span className="text-gray-900">Dark</span>
              </div>
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <Label className="text-gray-700 mb-2 block">Accent Color</Label>
          <div className="flex gap-2 mb-3">
            {colorPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onAccentColorChange(preset.value)}
                className={`w-10 h-10 rounded-md transition-all ${
                  accentColor === preset.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.name}
              />
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={accentColor}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onAccentColorChange(event.target.value)}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={accentColor}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onAccentColorChange(event.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Show Labels */}
        <div className="flex items-center justify-between py-2">
          <div>
            <Label className="text-gray-700">Show Labels</Label>
            <p className="text-gray-500 text-sm">Display text labels below icons</p>
          </div>
          <Switch checked={showLabels} onCheckedChange={onShowLabelsChange} />
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-900 text-sm">
            <strong>Note:</strong> The mobile bottom bar will automatically appear on devices
            with screen width less than 768px.
          </p>
        </div>
      </div>
    </Card>
  );
}