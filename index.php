
<?php
/**
 * Plugin Name: Vara Components
 * Description: Plugin con bloques personalizados (Login y Action) para enviar datos autenticados.
 * Version: 1.0
 * Author: David
 */

// 1️⃣ Registrar la opción para guardar el RPC URL
function gear_plugin_register_settings() {
    register_setting('gear_plugin_settings_group', 'gear_rpc_url');
}
add_action('admin_init', 'gear_plugin_register_settings');

// 2️⃣ Agregar el menú principal y submenús (como WPForms)
function gear_plugin_add_admin_menu() {
    // Menú principal "Vara Components"
    add_menu_page(
        'Vara Components',             // Título de la página
        'Vara Components',             // Título del menú
        'manage_options',              // Capacidad
        'gear_plugin',                 // Slug
        'gear_plugin_main_page',       // Callback de la página principal
        'dashicons-admin-generic',     // Icono
        80                             // Posición en el menú
    );

    // Submenú "Settings"
    add_submenu_page(
        'gear_plugin',                 // Slug del menú padre
        'Settings',                    // Título de la página
        'Settings',                    // Título del submenú
        'manage_options',              // Capacidad
        'gear_plugin_settings',        // Slug
        'gear_plugin_settings_page'    // Callback
    );

    // Submenú "About" (opcional)
    add_submenu_page(
        'gear_plugin',
        'About',
        'About',
        'manage_options',
        'gear_plugin_about',
        'gear_plugin_about_page'
    );
}
add_action('admin_menu', 'gear_plugin_add_admin_menu');

// 3️⃣ Página principal (Vara Components)
function gear_plugin_main_page() {
    echo '<div class="wrap"><h1>Vara Components</h1><p>Bienvenido al plugin Vara Components.</p></div>';
}

// 4️⃣ Página Settings (para el RPC URL)
function gear_plugin_settings_page() {
    ?>
    <div class="wrap">
        <h1>Gear Plugin Settings</h1>

        <?php if (isset($_GET['settings-updated']) && $_GET['settings-updated'] === 'true') : ?>
            <div id="message" class="updated notice is-dismissible">
                <p>Settings saved.</p>
            </div>
        <?php endif; ?>

        <form method="post" action="options.php">
            <?php settings_fields('gear_plugin_settings_group'); ?>
            <?php do_settings_sections('gear_plugin_settings_group'); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">RPC URL</th>
                    <td>
                        <input type="text" name="gear_rpc_url" value="<?php echo esc_attr(get_option('gear_rpc_url', '')); ?>" size="50" />
                        <p class="description">Ejemplo: wss://rpc.vara.network</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// 5️⃣ Página About (opcional)
function gear_plugin_about_page() {
    echo '<div class="wrap"><h1>About Vara Components</h1><p>Este plugin fue creado por David para enviar datos autenticados.</p></div>';
}

// 6️⃣ Agregar link "Settings" en la pantalla de Plugins
function gear_plugin_action_links($links) {
    $settings_link = '<a href="admin.php?page=gear_plugin_settings">Settings</a>';
    array_unshift($links, $settings_link);
    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'gear_plugin_action_links');

// 7️⃣ (Opcional) Registrar tus bloques (tu código original)
function vara_wordpress_register_blocks() {
    $blocks = ['action', 'counter_button', 'login_modal', 'wallet_connect'];

    foreach ( $blocks as $block ) {
        register_block_type( __DIR__ . "/build/$block" );
    }
}

add_action('init', 'vara_wordpress_register_blocks');


// 8️⃣ Inyectar GearPluginSettings en JS (global)
function vara_wordpress_register_common_gearapi_script() {
    wp_register_script(
        'vara-wordpress-common-gearapi-js',
        plugins_url('common/gearApiCommon.js', __FILE__), // asegúrate de tener este archivo
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_script('vara-wordpress-common-gearapi-js');

    wp_localize_script(
        'vara-wordpress-common-gearapi-js',
        'GearPluginSettings',
        array(
            'rpcUrl' => get_option('gear_rpc_url', '')
        )
    );
}
add_action('wp_enqueue_scripts', 'vara_wordpress_register_common_gearapi_script');




register_deactivation_hook(__FILE__, 'gear_plugin_deactivate');

function gear_plugin_deactivate() {
    delete_option('gear_rpc_url');
}

