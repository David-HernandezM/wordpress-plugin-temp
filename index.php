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
    register_block_type(__DIR__ . '/build/login');
}
add_action('init', 'json_sender_advanced_register_blocks');

function json_sender_block_scripts() {
    wp_enqueue_script(
        'json-sender-frontend',
        plugins_url('frontend.js', __FILE__),
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'json_sender_block_scripts');
