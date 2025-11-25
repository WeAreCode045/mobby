<?php
/**
 * Plugin Name:       Mobile Bottom Bar Builder
 * Description:       Customize a mobile bottom navigation bar from the WordPress dashboard.
 * Version:           0.1.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Mobile Bottom Bar Team
 * Text Domain:       mobile-bottom-bar
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Mobile_Bottom_Bar_Plugin {
    public const OPTION_KEY = 'mobile_bottom_bar_settings';
    private const SCRIPT_HANDLE = 'mobile-bottom-bar-admin';
    private const VERSION = '0.1.0';

    public static function instance(): self {
        static $instance = null;

        if (null === $instance) {
            $instance = new self();
        }

        return $instance;
    }

    private function __construct() {
        add_action('admin_menu', [$this, 'register_admin_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_action('wp_footer', [$this, 'render_frontend_bar']);
    }

    public function register_admin_page(): void {
        add_menu_page(
            __('Mobile Bottom Bar', 'mobile-bottom-bar'),
            __('Mobile Bottom Bar', 'mobile-bottom-bar'),
            'manage_options',
            'mobile-bottom-bar',
            [$this, 'render_app'],
            'dashicons-smartphone',
            58
        );
    }

    public function render_app(): void {
        echo '<div class="wrap"><div id="mobile-bottom-bar-root"></div></div>';
    }

    public function enqueue_assets(string $hook): void {
        if ('toplevel_page_mobile-bottom-bar' !== $hook) {
            return;
        }

        $entry = $this->get_manifest_entry();
        $asset_base = plugin_dir_url(__FILE__) . 'build/';

        if (!$entry) {
            wp_enqueue_script(self::SCRIPT_HANDLE, '', [], self::VERSION, true);
            wp_add_inline_script(self::SCRIPT_HANDLE, 'console.error("Mobile Bottom Bar assets missing. Run npm run build before loading the admin page.");');
            return;
        }

        wp_enqueue_script(
            self::SCRIPT_HANDLE,
            $asset_base . $entry['file'],
            [],
            self::VERSION,
            true
        );

        if (!empty($entry['css'])) {
            foreach ($entry['css'] as $index => $css_file) {
                wp_enqueue_style(
                    self::SCRIPT_HANDLE . ($index ? "-{$index}" : ''),
                    $asset_base . $css_file,
                    [],
                    self::VERSION
                );
            }
        }

        wp_localize_script(
            self::SCRIPT_HANDLE,
            'mobileBottomBarData',
            [
                'restUrl' => esc_url_raw(rest_url('mobile-bottom-bar/v1/settings')),
                'nonce' => wp_create_nonce('wp_rest'),
                'menus' => $this->get_menus(),
                'settings' => $this->get_settings(),
            ]
        );
    }

    public function enqueue_frontend_assets(): void {
        if (is_admin()) {
            return;
        }

        $settings = $this->get_settings();

        if (empty($settings['enabled']) || empty($settings['selectedMenu'])) {
            return;
        }

        wp_enqueue_style(
            'mobile-bottom-bar-frontend',
            plugin_dir_url(__FILE__) . 'public/frontend.css',
            [],
            self::VERSION
        );
    }

    public function register_rest_routes(): void {
        register_rest_route(
            'mobile-bottom-bar/v1',
            '/settings',
            [
                [
                    'methods' => 'GET',
                    'callback' => [$this, 'rest_get_settings'],
                    'permission_callback' => [$this, 'permissions_check'],
                ],
                [
                    'methods' => 'POST',
                    'callback' => [$this, 'rest_save_settings'],
                    'permission_callback' => [$this, 'permissions_check'],
                    'args' => $this->get_rest_args(),
                ],
            ]
        );
    }

    public function rest_get_settings(): array {
        return $this->get_settings();
    }

    public function rest_save_settings(\WP_REST_Request $request): \WP_REST_Response {
        $data = $this->sanitize_settings((array) $request->get_json_params());

        update_option(self::OPTION_KEY, $data);

        return new \WP_REST_Response($data, 200);
    }

    public function permissions_check(): bool {
        return current_user_can('manage_options');
    }

    private function get_manifest_entry(): ?array {
        $base = plugin_dir_path(__FILE__) . 'build/';
        $candidates = [
            $base . '.vite/manifest.json',
            $base . 'manifest.json',
        ];

        foreach ($candidates as $manifest_path) {
            if (!file_exists($manifest_path)) {
                continue;
            }

            $manifest = json_decode((string) file_get_contents($manifest_path), true);

            if (is_array($manifest)) {
                return $manifest['src/main.tsx'] ?? null;
            }
        }

        return null;
    }

    private function get_menus(): array {
        $menus = wp_get_nav_menus();

        if (empty($menus)) {
            return [];
        }

        return array_map(
            static fn($menu) => [
                'id' => $menu->slug,
                'name' => $menu->name,
            ],
            $menus
        );
    }

    private function get_settings(): array {
        $defaults = [
            'enabled' => false,
            'selectedMenu' => '',
            'barStyle' => 'dark',
            'accentColor' => '#6366f1',
            'showLabels' => true,
            'layout' => 'standard',
            'iconSize' => 20,
            'iconColor' => '#9ca3af',
            'textSize' => 12,
            'textWeight' => '400',
            'textFont' => 'system-ui',
            'textColor' => '#6b7280',
        ];

        $stored = get_option(self::OPTION_KEY, []);

        return wp_parse_args(is_array($stored) ? $stored : [], $defaults);
    }

    private function sanitize_settings(array $data): array {
        return [
            'enabled' => (bool) ($data['enabled'] ?? false),
            'selectedMenu' => sanitize_key($data['selectedMenu'] ?? ''),
            'barStyle' => in_array($data['barStyle'] ?? 'dark', ['light', 'dark'], true) ? $data['barStyle'] : 'dark',
            'accentColor' => sanitize_hex_color($data['accentColor'] ?? '#6366f1') ?: '#6366f1',
            'showLabels' => (bool) ($data['showLabels'] ?? true),
            'layout' => sanitize_text_field($data['layout'] ?? 'standard'),
            'iconSize' => (int) ($data['iconSize'] ?? 20),
            'iconColor' => sanitize_hex_color($data['iconColor'] ?? '#9ca3af') ?: '#9ca3af',
            'textSize' => (int) ($data['textSize'] ?? 12),
            'textWeight' => sanitize_text_field($data['textWeight'] ?? '400'),
            'textFont' => sanitize_text_field($data['textFont'] ?? 'system-ui'),
            'textColor' => sanitize_hex_color($data['textColor'] ?? '#6b7280') ?: '#6b7280',
        ];
    }

    private function get_rest_args(): array {
        return [
            'enabled' => [
                'type' => 'boolean',
                'required' => false,
            ],
            'selectedMenu' => [
                'type' => 'string',
                'required' => false,
            ],
            'barStyle' => [
                'type' => 'string',
                'enum' => ['light', 'dark'],
                'required' => false,
            ],
            'accentColor' => [
                'type' => 'string',
                'required' => false,
            ],
            'showLabels' => [
                'type' => 'boolean',
                'required' => false,
            ],
            'layout' => [
                'type' => 'string',
                'required' => false,
            ],
            'iconSize' => [
                'type' => 'integer',
                'required' => false,
            ],
            'iconColor' => [
                'type' => 'string',
                'required' => false,
            ],
            'textSize' => [
                'type' => 'integer',
                'required' => false,
            ],
            'textWeight' => [
                'type' => 'string',
                'required' => false,
            ],
            'textFont' => [
                'type' => 'string',
                'required' => false,
            ],
            'textColor' => [
                'type' => 'string',
                'required' => false,
            ],
        ];
    }

    public function render_frontend_bar(): void {
        if (is_admin()) {
            return;
        }

        $settings = $this->get_settings();

        if (empty($settings['enabled']) || empty($settings['selectedMenu'])) {
            return;
        }

        $items = $this->get_menu_items($settings['selectedMenu']);

        if (empty($items)) {
            return;
        }

        $style_attribute = $this->build_style_attribute($settings);
        $classes = ['wp-mbb'];
        $classes[] = $settings['barStyle'] === 'light' ? 'wp-mbb--light' : 'wp-mbb--dark';

        echo '<nav id="wp-mobile-bottom-bar" class="' . esc_attr(implode(' ', $classes)) . '" style="' . esc_attr($style_attribute) . '" aria-label="' . esc_attr__('Mobile bottom navigation', 'mobile-bottom-bar') . '">';
        echo '<div class="wp-mbb__inner">';

        foreach ($items as $item) {
            if (!($item instanceof \WP_Post)) {
                continue;
            }

            $is_current = in_array('current-menu-item', (array) $item->classes, true);
            $item_classes = ['wp-mbb__item'];

            if ($is_current) {
                $item_classes[] = 'is-active';
            }

            $target = $item->target ? ' target="' . esc_attr($item->target) . '"' : '';
            $rel = $item->xfn ? ' rel="' . esc_attr($item->xfn) . '"' : '';

            echo '<a class="' . esc_attr(implode(' ', $item_classes)) . '" href="' . esc_url($item->url ?? '#') . '"' . $target . $rel . '>';
            echo '<span class="wp-mbb__icon" aria-hidden="true">';
            echo '<span class="wp-mbb__icon-dot"></span>';
            echo '</span>';

            if (!empty($settings['showLabels'])) {
                echo '<span class="wp-mbb__label">' . esc_html($item->title ?? '') . '</span>';
            }

            echo '</a>';
        }

        echo '</div>';
        echo '</nav>';
    }

    private function get_menu_items(string $menu_slug): array {
        $menu = wp_get_nav_menu_object($menu_slug);

        if (!$menu && is_numeric($menu_slug)) {
            $menu = wp_get_nav_menu_object((int) $menu_slug);
        }

        if (!$menu) {
            return [];
        }

        $items = wp_get_nav_menu_items($menu->term_id);

        return is_array($items) ? $items : [];
    }

    private function build_style_attribute(array $settings): string {
        $background = $settings['barStyle'] === 'light' ? '#ffffff' : '#0f172a';
        $text = $settings['barStyle'] === 'light' ? '#0f172a' : '#f8fafc';

        $variables = [
            '--wp-mbb-accent' => $settings['accentColor'],
            '--wp-mbb-background' => $background,
            '--wp-mbb-text' => $text,
            '--wp-mbb-icon-color' => $settings['iconColor'],
            '--wp-mbb-text-color' => $settings['textColor'],
            '--wp-mbb-icon-size' => $settings['iconSize'] . 'px',
            '--wp-mbb-text-size' => $settings['textSize'] . 'px',
            '--wp-mbb-text-weight' => $settings['textWeight'],
        ];

        $chunks = [];

        foreach ($variables as $key => $value) {
            $chunks[] = $key . ':' . $value;
        }

        return implode(';', $chunks);
    }
}

register_activation_hook(
    __FILE__,
    static function (): void {
        if (false === get_option(Mobile_Bottom_Bar_Plugin::OPTION_KEY, false)) {
            update_option(Mobile_Bottom_Bar_Plugin::OPTION_KEY, []);
        }
    }
);

Mobile_Bottom_Bar_Plugin::instance();
