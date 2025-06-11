const fs = require('fs');
const path = require('path');
const metadata = require('./package.json');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName),
                              path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}


const buildDirPath = path.join(__dirname, 'build');
const distDir = path.join(__dirname, metadata.name + '-dist');
const commonDistDir = path.join(distDir.toString(), 'common');
const indexPhpPath = path.join(__dirname, 'index.php');
const gearCommonFile = path.join(commonDistDir.toString(), 'gearCommon.js');
const itemsToCopy = [
    'build',
    'index.php',
    'README.md'
];

const blocks = fs.readdirSync(buildDirPath).filter(file =>
  fs.statSync(path.join(buildDirPath, file)).isDirectory()
);
const blocksString = blocks.map(block => `'${block}'`).join(', ');

const indexPhpContent =`<?php
/**
 * Plugin Name: Vara Components
 * Description: Plugin con bloques personalizados para enviar datos autenticados.
 * Version: 1.0
 * Author: David
 */

// 1️⃣ Registrar la opción para guardar el RPC URL
function gear_plugin_register_settings() {
    register_setting('gear_plugin_settings_group', 'gear_rpc_url');
    register_setting('gear_plugin_settings_group', 'gear_server_url');
    register_setting('gear_plugin_settings_group', 'gear_contract_id');
    register_setting('gear_plugin_settings_group', 'gear_idl_content');
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
                        <p class="description">Example: wss://rpc.vara.network</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">BACKEND URL</th>
                    <td>
                        <input type="text" name="gear_server_url" value="<?php echo esc_attr(get_option('gear_server_url', '')); ?>" size="50" />
                        <p class="description">Example: http://localhost</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">CONTRACT ADDRESS</th>
                    <td>
                        <input type="text" name="gear_contract_id" value="<?php echo esc_attr(get_option('gear_contract_id', '')); ?>" size="50" />
                        <p class="description">Example: 0x03jf21...</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">IDL Content</th>
                    <td>
                        <textarea name="gear_idl_content" rows="10" cols="80"><?php echo esc_textarea(get_option('gear_idl_content', '')); ?></textarea>
                        <p class="description">Paste here your contract idl content.</p>
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
    $blocks = [${blocksString}];

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
            'rpcUrl' => get_option('gear_rpc_url', ''),
            'backendUrl' => get_option('gear_server_url', ''),
            'contractAddress' => get_option('gear_contract_id', ''),
            'contractIdl' => get_option('gear_idl_content', '')
        )
    );

    wp_add_inline_script(
        'vara-wordpress-common-gearapi-js',
        'window.gearApiWorker = window.gearApiWorker || new Worker("' . plugins_url('build/sailscallsWorker.js', __FILE__) . '", { type: "module" });',
        'after'
    );
}

add_action('wp_enqueue_scripts', 'vara_wordpress_register_common_gearapi_script');


register_deactivation_hook(__FILE__, 'gear_plugin_deactivate');

function gear_plugin_deactivate() {
    delete_option('gear_rpc_url');
    delete_option('gear_server_url');
    delete_option('gear_contract_id');
    delete_option('gear_idl_content');
}`;


console.log('Dist dir:')
console.log(distDir.toString());
console.log(`\n📦 Bloques detectados: ${blocks.join(', ')}`);

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

if (fs.existsSync(indexPhpPath)) {
    fs.rmSync(indexPhpPath);
}

fs.mkdirSync(commonDistDir);

try {
    fs.writeFileSync(indexPhpPath, indexPhpContent);
    fs.writeFileSync(gearCommonFile, '// hook file for wp_localize_script');
} catch(e) {
    console.log("❌ Error while creating index.php file");
    process.exit(-1);
}

itemsToCopy.forEach(item =>{
    const src = path.join(__dirname, item);
    const dest = path.join(distDir, item);

    copyRecursiveSync(src, dest);
});

console.log("✅ plugin packaged in:", distDir);



const x = `
<?php
/**
 * Plugin Name: JSON Sender Advanced
 * Description: Plugin con bloques personalizados (Login y Action) para enviar datos autenticados.
 * Version: 1.0
 * Author: David
 */

// Registra ambos bloques
function json_sender_advanced_register_blocks() {
    
    register_block_type(__DIR__ . '/build/action');
    register_block_type(__DIR__ . '/build/login_modal');
    register_block_type(__DIR__ . '/build/counter_button');
}

add_action('init', 'json_sender_advanced_register_blocks');

// function json_sender_block_scripts() {
//     wp_enqueue_script(
//         'json-sender-frontend',
//         plugins_url('frontend.js', __FILE__),
//         array(),
//         null,
//         true
//     );
// }
// add_action('wp_enqueue_scripts', 'json_sender_block_scripts');
`;











/*
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-json-sender]').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            const json = button.dataset.json;
            console.log('Se hizo click!!');
            alert('Se hizo click!!');
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: json
            }).then(res => res.json()).then(console.log).catch(console.error);
        });
    });

    document.querySelectorAll('[data-json-login]').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.auth;
            const user = prompt("Usuario:");
            const pass = prompt("Contraseña:");
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, pass })
            }).then(res => {
                const token = res.headers.get('Set-Cookie');
                if (token) document.cookie = token;
                return res.json();
            }).then(console.log).catch(console.error);
        });
    });






    



    // document.querySelectorAll('.close-modal-btn').forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         const overlay = btn.closest('.modal-overlay');
    //         if (overlay) {
    //             overlay.style.display = 'none';
    //         }
    //     });
    // });

    // document.querySelectorAll('.confirm-send-btn').forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         const url = btn.dataset.url;
    //         const json = btn.dataset.json;

    //         fetch(url, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: json
    //         }).then(() => {
    //             alert('✅ JSON enviado con éxito');
    //             btn.closest('.modal-overlay').style.display = 'none';
    //         }).catch(() => {
    //             alert('❌ Hubo un error al enviar');
    //         });
    //     });
    // });

    // document.querySelectorAll('.open-modal-btn').forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         const overlay = btn.parentElement.querySelector('.modal-overlay');
    //         if (overlay) {
    //             overlay.style.display = 'flex';
    //         }
    //     });
    // });
});
*/
