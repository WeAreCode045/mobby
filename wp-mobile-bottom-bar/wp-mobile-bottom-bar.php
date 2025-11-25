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
        $manifest_path = plugin_dir_path(__FILE__) . 'build/manifest.json';

        if (!file_exists($manifest_path)) {
            return null;
        }

        $manifest = json_decode((string) file_get_contents($manifest_path), true);

        if (!is_array($manifest)) {
            return null;
        }

        return $manifest['src/main.tsx'] ?? null;
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
