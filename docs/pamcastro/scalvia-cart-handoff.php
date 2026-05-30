<?php
/**
 * Plugin Name: Scalvia Cart Handoff for Pam Castro
 * Description: Receives a validated product list from scalvia.mx and builds the WooCommerce cart before redirecting to /carrito/.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_post_nopriv_scalvia_cart_handoff', 'scalvia_cart_handoff');
add_action('admin_post_scalvia_cart_handoff', 'scalvia_cart_handoff');

function scalvia_cart_handoff() {
    if (!class_exists('WooCommerce')) {
        wp_die('WooCommerce no esta disponible.', 500);
    }

    $allowed_products = array(775, 125, 141, 144);
    $raw_items = isset($_GET['items']) ? sanitize_text_field(wp_unslash($_GET['items'])) : '';
    $items = array();

    foreach (explode(',', $raw_items) as $raw_item) {
        if (!preg_match('/^(\d+):(\d+)$/', trim($raw_item), $matches)) {
            continue;
        }

        $product_id = absint($matches[1]);
        $quantity = max(1, min(99, absint($matches[2])));

        if (!in_array($product_id, $allowed_products, true)) {
            continue;
        }

        $items[$product_id] = isset($items[$product_id])
            ? min(99, $items[$product_id] + $quantity)
            : $quantity;
    }

    if (empty($items)) {
        wp_safe_redirect(wc_get_cart_url());
        exit;
    }

    if (null === WC()->cart) {
        wc_load_cart();
    }

    WC()->cart->empty_cart();

    foreach ($items as $product_id => $quantity) {
        WC()->cart->add_to_cart($product_id, $quantity);
    }

    if (!empty($_GET['coupon'])) {
        $coupon = wc_format_coupon_code(wp_unslash($_GET['coupon']));
        if ($coupon) {
            WC()->cart->apply_coupon($coupon);
        }
    }

    WC()->cart->calculate_totals();
    wp_safe_redirect(wc_get_cart_url());
    exit;
}
