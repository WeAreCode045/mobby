import { Home, Search, ShoppingBag, User, Plus } from 'lucide-react';
import Image1 from '../imports/Image1';

interface LayoutSelectorProps {
  selectedLayout: string;
  onLayoutChange: (layout: string) => void;
  accentColor: string;
  isDark: boolean;
}

const layoutOptions = [
  { id: 'standard', name: 'Standard', description: 'Equal width items' },
  { id: 'centered', name: 'Centered FAB', description: 'Center item elevated' },
  { id: 'floating', name: 'Floating Pill', description: 'Rounded floating bar' },
  { id: 'divided', name: 'Divided', description: 'Items with dividers' },
  { id: 'compact', name: 'Compact', description: 'Minimal spacing' },
  { id: 'large', name: 'Large Icons', description: 'Bigger icon sizes' },
];

export function LayoutSelector({
  selectedLayout,
  onLayoutChange,
  accentColor,
  isDark,
}: LayoutSelectorProps) {
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const iconColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const activeIconColor = 'text-white';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-gray-900">Layout Options</h3>
        <div className="relative w-24 h-16 border-2 border-gray-300 rounded overflow-hidden">
          <Image1 />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {layoutOptions.map((layout) => (
          <button
            key={layout.id}
            onClick={() => onLayoutChange(layout.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedLayout === layout.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="mb-3">
              <div className="text-gray-900 mb-1">{layout.name}</div>
              <div className="text-gray-500 text-sm">{layout.description}</div>
            </div>

            {/* Mini Preview */}
            <div className={`${bgColor} ${borderColor} border rounded-lg px-2 py-2`}>
              {layout.id === 'standard' && (
                <StandardLayout accentColor={accentColor} iconColor={iconColor} activeIconColor={activeIconColor} />
              )}
              {layout.id === 'centered' && (
                <CenteredLayout accentColor={accentColor} iconColor={iconColor} activeIconColor={activeIconColor} />
              )}
              {layout.id === 'floating' && (
                <FloatingLayout accentColor={accentColor} iconColor={iconColor} activeIconColor={activeIconColor} />
              )}
              {layout.id === 'divided' && (
                <DividedLayout accentColor={accentColor} iconColor={iconColor} activeIconColor={activeIconColor} isDark={isDark} />
              )}
              {layout.id === 'compact' && (
                <CompactLayout accentColor={accentColor} iconColor={iconColor} activeIconColor={activeIconColor} />
              )}
              {layout.id === 'large' && (
                <LargeLayout accentColor={accentColor} iconColor={iconColor} activeIconColor={activeIconColor} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StandardLayout({ accentColor, iconColor, activeIconColor }: any) {
  return (
    <div className="flex items-center justify-around">
      <div className="p-1.5 rounded-lg" style={{ backgroundColor: accentColor }}>
        <Home className={`w-3 h-3 ${activeIconColor}`} />
      </div>
      <Search className={`w-3 h-3 ${iconColor}`} />
      <ShoppingBag className={`w-3 h-3 ${iconColor}`} />
      <User className={`w-3 h-3 ${iconColor}`} />
    </div>
  );
}

function CenteredLayout({ accentColor, iconColor, activeIconColor }: any) {
  return (
    <div className="flex items-center justify-around relative">
      <Home className={`w-3 h-3 ${iconColor}`} />
      <Search className={`w-3 h-3 ${iconColor}`} />
      <div className="absolute left-1/2 -translate-x-1/2 -top-2 p-2 rounded-full shadow-lg" style={{ backgroundColor: accentColor }}>
        <Plus className={`w-3 h-3 ${activeIconColor}`} />
      </div>
      <div className="w-3"></div>
      <ShoppingBag className={`w-3 h-3 ${iconColor}`} />
      <User className={`w-3 h-3 ${iconColor}`} />
    </div>
  );
}

function FloatingLayout({ accentColor, iconColor, activeIconColor }: any) {
  return (
    <div className="px-2">
      <div className="flex items-center justify-around bg-gray-800 rounded-full px-2 py-1.5 shadow-lg">
        <div className="p-1.5 rounded-full" style={{ backgroundColor: accentColor }}>
          <Home className={`w-3 h-3 ${activeIconColor}`} />
        </div>
        <Search className={`w-3 h-3 text-gray-400`} />
        <ShoppingBag className={`w-3 h-3 text-gray-400`} />
        <User className={`w-3 h-3 text-gray-400`} />
      </div>
    </div>
  );
}

function DividedLayout({ accentColor, iconColor, activeIconColor, isDark }: any) {
  const dividerColor = isDark ? 'border-gray-700' : 'border-gray-200';
  return (
    <div className="flex items-center justify-around divide-x" style={{ borderColor: dividerColor }}>
      <div className="flex-1 flex justify-center">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: accentColor }}>
          <Home className={`w-3 h-3 ${activeIconColor}`} />
        </div>
      </div>
      <div className={`flex-1 flex justify-center border-l ${dividerColor}`}>
        <Search className={`w-3 h-3 ${iconColor}`} />
      </div>
      <div className={`flex-1 flex justify-center border-l ${dividerColor}`}>
        <ShoppingBag className={`w-3 h-3 ${iconColor}`} />
      </div>
      <div className={`flex-1 flex justify-center border-l ${dividerColor}`}>
        <User className={`w-3 h-3 ${iconColor}`} />
      </div>
    </div>
  );
}

function CompactLayout({ accentColor, iconColor, activeIconColor }: any) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="p-1 rounded" style={{ backgroundColor: accentColor }}>
        <Home className={`w-3 h-3 ${activeIconColor}`} />
      </div>
      <Search className={`w-3 h-3 ${iconColor}`} />
      <ShoppingBag className={`w-3 h-3 ${iconColor}`} />
      <User className={`w-3 h-3 ${iconColor}`} />
    </div>
  );
}

function LargeLayout({ accentColor, iconColor, activeIconColor }: any) {
  return (
    <div className="flex items-center justify-around">
      <div className="p-2 rounded-xl" style={{ backgroundColor: accentColor }}>
        <Home className={`w-4 h-4 ${activeIconColor}`} />
      </div>
      <Search className={`w-4 h-4 ${iconColor}`} />
      <ShoppingBag className={`w-4 h-4 ${iconColor}`} />
      <User className={`w-4 h-4 ${iconColor}`} />
    </div>
  );
}
