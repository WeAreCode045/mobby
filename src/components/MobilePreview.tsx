import { Home, Search, ShoppingBag, Clock, User, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { StandardBar, CenteredBar, FloatingBar, DividedBar, CompactBar, LargeBar } from './BarLayouts';

interface MobilePreviewProps {
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

// Mock menu items based on selected menu
const menuItems = {
  'primary-menu': [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: ShoppingBag, label: 'Cart', href: '/cart' },
    { icon: User, label: 'Profile', href: '/profile' },
  ],
  'footer-menu': [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingBag, label: 'Shop', href: '/shop' },
    { icon: Clock, label: 'History', href: '/history' },
    { icon: User, label: 'Account', href: '/account' },
  ],
  'mobile-menu': [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: ShoppingBag, label: 'Cart', href: '/cart' },
    { icon: User, label: 'Profile', href: '/profile' },
  ],
  'quick-links': [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingBag, label: 'Cart', href: '/cart' },
    { icon: Clock, label: 'Recent', href: '/recent' },
    { icon: User, label: 'Account', href: '/account' },
  ],
};

export function MobilePreview({
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
}: MobilePreviewProps) {
  const items = menuItems[selectedMenu as keyof typeof menuItems] || menuItems['primary-menu'];
  const isDark = barStyle === 'dark';

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Live Preview</h2>
        <p className="text-gray-600 mb-6">See how your mobile bottom bar will look</p>

        {/* Mobile Device Frame */}
        <div className="mx-auto max-w-sm">
          <div
            className="rounded-3xl border-8 border-gray-900 overflow-hidden shadow-2xl"
            style={{ aspectRatio: '9/19.5' }}
          >
            {/* Mobile Screen Content */}
            <div className="h-full bg-white relative flex flex-col">
              {/* Mock Content Area */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-32 bg-gray-200 rounded mt-6"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                </div>
              </div>

              {/* Mobile Bottom Bar */}
              {layout === 'floating' ? (
                <div className="pb-4 px-4">
                  <FloatingBar
                    items={items}
                    accentColor={accentColor}
                    showLabels={showLabels}
                    isDark={isDark}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    textSize={textSize}
                    textWeight={textWeight}
                    textFont={textFont}
                    textColor={textColor}
                  />
                </div>
              ) : (
                <div
                  className={`${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${
                    isDark ? 'border-gray-800' : 'border-gray-200'
                  }`}
                >
                  {layout === 'standard' && (
                    <StandardBar
                      items={items}
                      accentColor={accentColor}
                      showLabels={showLabels}
                      isDark={isDark}
                      iconSize={iconSize}
                      iconColor={iconColor}
                      textSize={textSize}
                      textWeight={textWeight}
                      textFont={textFont}
                      textColor={textColor}
                    />
                  )}
                  {layout === 'centered' && (
                    <CenteredBar
                      items={items}
                      accentColor={accentColor}
                      showLabels={showLabels}
                      isDark={isDark}
                      iconSize={iconSize}
                      iconColor={iconColor}
                      textSize={textSize}
                      textWeight={textWeight}
                      textFont={textFont}
                      textColor={textColor}
                    />
                  )}
                  {layout === 'divided' && (
                    <DividedBar
                      items={items}
                      accentColor={accentColor}
                      showLabels={showLabels}
                      isDark={isDark}
                      iconSize={iconSize}
                      iconColor={iconColor}
                      textSize={textSize}
                      textWeight={textWeight}
                      textFont={textFont}
                      textColor={textColor}
                    />
                  )}
                  {layout === 'compact' && (
                    <CompactBar
                      items={items}
                      accentColor={accentColor}
                      showLabels={showLabels}
                      isDark={isDark}
                      iconSize={iconSize}
                      iconColor={iconColor}
                      textSize={textSize}
                      textWeight={textWeight}
                      textFont={textFont}
                      textColor={textColor}
                    />
                  )}
                  {layout === 'large' && (
                    <LargeBar
                      items={items}
                      accentColor={accentColor}
                      showLabels={showLabels}
                      isDark={isDark}
                      iconSize={iconSize}
                      iconColor={iconColor}
                      textSize={textSize}
                      textWeight={textWeight}
                      textFont={textFont}
                      textColor={textColor}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}