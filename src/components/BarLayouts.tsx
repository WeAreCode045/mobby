import { Plus } from 'lucide-react';

interface BarProps {
  items: any[];
  accentColor: string;
  showLabels: boolean;
  isDark: boolean;
  iconSize: number;
  iconColor: string;
  textSize: number;
  textWeight: string;
  textFont: string;
  textColor: string;
}

export function StandardBar({ items, accentColor, showLabels, iconSize, iconColor, textSize, textWeight, textFont, textColor, isDark }: BarProps) {
  return (
    <div className="px-2 py-3">
      <div className="flex items-center justify-around">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 min-w-0 flex-1 cursor-pointer transition-all"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive ? '' : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: accentColor } : {}}
              >
                <Icon
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: isActive ? 'white' : iconColor,
                  }}
                />
              </div>
              {showLabels && (
                <span
                  className="truncate max-w-full"
                  style={{
                    fontSize: `${textSize}px`,
                    fontWeight: textWeight,
                    fontFamily: textFont,
                    color: isActive ? accentColor : textColor,
                  }}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CenteredBar({ items, accentColor, showLabels, iconSize, iconColor, textSize, textWeight, textFont, textColor, isDark }: BarProps) {
  const leftItems = items.slice(0, 2);
  const rightItems = items.slice(2, 4);

  return (
    <div className="px-2 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-around flex-1">
          {leftItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0;

            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={`p-2 rounded-xl ${
                    isActive ? '' : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                  style={isActive ? { backgroundColor: accentColor } : {}}
                >
                  <Icon
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      color: isActive ? 'white' : iconColor,
                    }}
                  />
                </div>
                {showLabels && (
                  <span
                    style={{
                      fontSize: `${textSize}px`,
                      fontWeight: textWeight,
                      fontFamily: textFont,
                      color: isActive ? accentColor : textColor,
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 -top-4 p-3 rounded-full shadow-xl cursor-pointer"
          style={{ backgroundColor: accentColor }}
        >
          <Plus className="w-6 h-6 text-white" />
        </div>

        <div className="flex items-center justify-around flex-1">
          {rightItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={`p-2 rounded-xl ${
                    isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      color: iconColor,
                    }}
                  />
                </div>
                {showLabels && (
                  <span
                    style={{
                      fontSize: `${textSize}px`,
                      fontWeight: textWeight,
                      fontFamily: textFont,
                      color: textColor,
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FloatingBar({ items, accentColor, showLabels, iconSize, iconColor, textSize, textWeight, textFont, textColor }: BarProps) {
  return (
    <div className="bg-gray-900 rounded-full px-4 py-3 shadow-2xl">
      <div className="flex items-center justify-around gap-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div
                className={`p-2 rounded-full transition-all ${
                  isActive ? '' : 'hover:bg-gray-800'
                }`}
                style={isActive ? { backgroundColor: accentColor } : {}}
              >
                <Icon
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: isActive ? 'white' : '#9ca3af',
                  }}
                />
              </div>
              {showLabels && (
                <span
                  style={{
                    fontSize: `${textSize}px`,
                    fontWeight: textWeight,
                    fontFamily: textFont,
                    color: isActive ? accentColor : '#9ca3af',
                  }}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DividedBar({ items, accentColor, showLabels, iconSize, iconColor, textSize, textWeight, textFont, textColor, isDark }: BarProps) {
  return (
    <div className="px-2 py-3">
      <div className="flex items-center justify-around">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1 flex-1 cursor-pointer ${
                index !== 0 ? `border-l ${isDark ? 'border-gray-700' : 'border-gray-200'}` : ''
              }`}
            >
              <div
                className={`p-2 rounded-xl ${
                  isActive ? '' : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: accentColor } : {}}
              >
                <Icon
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: isActive ? 'white' : iconColor,
                  }}
                />
              </div>
              {showLabels && (
                <span
                  style={{
                    fontSize: `${textSize}px`,
                    fontWeight: textWeight,
                    fontFamily: textFont,
                    color: isActive ? accentColor : textColor,
                  }}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CompactBar({ items, accentColor, showLabels, iconSize, iconColor, textSize, textWeight, textFont, textColor, isDark }: BarProps) {
  return (
    <div className="px-4 py-2.5">
      <div className="flex items-center justify-center gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <div
                className={`p-1.5 rounded-lg ${
                  isActive ? '' : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: accentColor } : {}}
              >
                <Icon
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: isActive ? 'white' : iconColor,
                  }}
                />
              </div>
              {showLabels && (
                <span
                  style={{
                    fontSize: `${textSize}px`,
                    fontWeight: textWeight,
                    fontFamily: textFont,
                    color: isActive ? accentColor : textColor,
                  }}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LargeBar({ items, accentColor, showLabels, iconSize, iconColor, textSize, textWeight, textFont, textColor, isDark }: BarProps) {
  return (
    <div className="px-2 py-4">
      <div className="flex items-center justify-around">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={`p-3 rounded-2xl ${
                  isActive ? '' : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: accentColor } : {}}>
                <Icon
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: isActive ? 'white' : iconColor,
                  }}
                />
              </div>
              {showLabels && (
                <span
                  style={{
                    fontSize: `${textSize}px`,
                    fontWeight: textWeight,
                    fontFamily: textFont,
                    color: isActive ? accentColor : textColor,
                  }}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
