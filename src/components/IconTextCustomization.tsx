import type { ChangeEvent } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';

interface IconTextCustomizationProps {
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

const fontOptions = [
  { value: 'system-ui', label: 'System UI' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
];

const weightOptions = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semibold' },
  { value: '700', label: 'Bold' },
];

export function IconTextCustomization({
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
}: IconTextCustomizationProps) {
  return (
    <Card className="p-6">
      <h2 className="text-gray-900 mb-6">Icon & Text Customization</h2>

      <div className="space-y-6">
        {/* Icon Section */}
        <div className="space-y-4">
          <h3 className="text-gray-900">Icon Settings</h3>
          
          {/* Icon Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-gray-700">Icon Size</Label>
              <span className="text-gray-600">{iconSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="32"
              step="1"
              value={iconSize}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onIconSizeChange(Number(event.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-gray-500 text-sm mt-1">
              <span>16px</span>
              <span>32px</span>
            </div>
          </div>

          {/* Icon Color */}
          <div>
            <Label className="text-gray-700 mb-2 block">Icon Color (Inactive)</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={iconColor}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onIconColorChange(event.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={iconColor}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onIconColorChange(event.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Color for inactive icons (active uses white on accent)
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Text Section */}
        <div className="space-y-4">
          <h3 className="text-gray-900">Text Settings</h3>
          
          {/* Text Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-gray-700">Text Size</Label>
              <span className="text-gray-600">{textSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="16"
              step="1"
              value={textSize}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onTextSizeChange(Number(event.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-gray-500 text-sm mt-1">
              <span>10px</span>
              <span>16px</span>
            </div>
          </div>

          {/* Text Weight */}
          <div>
            <Label htmlFor="text-weight" className="text-gray-700 mb-2 block">
              Text Weight
            </Label>
            <select
              id="text-weight"
              value={textWeight}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => onTextWeightChange(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {weightOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Font */}
          <div>
            <Label htmlFor="text-font" className="text-gray-700 mb-2 block">
              Text Font
            </Label>
            <select
              id="text-font"
              value={textFont}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => onTextFontChange(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: textFont }}
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value} style={{ fontFamily: option.value }}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Color */}
          <div>
            <Label className="text-gray-700 mb-2 block">Text Color (Inactive)</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={textColor}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onTextColorChange(event.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onTextColorChange(event.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Color for inactive text (active uses accent color)
            </p>
          </div>
        </div>

        {/* Preview Sample */}
        <div className="border-t border-gray-200 pt-4">
          <Label className="text-gray-700 mb-3 block">Preview</Label>
          <div className="bg-gray-50 rounded-lg p-4 flex justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <div className="p-2">
                <svg
                  width={iconSize}
                  height={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: `${textSize}px`,
                  fontWeight: textWeight,
                  fontFamily: textFont,
                  color: textColor,
                }}
              >
                Inactive
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#6366f1' }}>
                <svg
                  width={iconSize}
                  height={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: `${textSize}px`,
                  fontWeight: textWeight,
                  fontFamily: textFont,
                  color: '#6366f1',
                }}
              >
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
