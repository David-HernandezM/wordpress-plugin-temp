<?php
/**
 * Plugin Name: Mi Plugin Gutenberg Global Store (TS)
 */

function mi_plugin_register_block_assets() {
    register_block_type(__DIR__ . '/src/bloques/bloque-a');
    register_block_type(__DIR__ . '/src/bloques/bloque-b');
    register_block_type(__DIR__ . '/src/bloques/bloque-c');
}
add_action('init', 'mi_plugin_register_block_assets');