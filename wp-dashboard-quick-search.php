<?php
/*
Plugin Name: WP Dashboard Quick Search
Description: This plugin allows you find WordPress admin menu items easy.
Version: 1.0
Author: Javad Samiei
Author URI: https://github.com/javadhub
License: GPL v2.0 or later
License URI: http://www.opensource.org/licenses/gpl-license.php
Text Domain: wp-dashboard-quick-search
Domain Path: /languages/
*/

/** Display verbose errors */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/** styles & scripts */
add_action( 'admin_enqueue_scripts', 'wp_dqs_admin_enqueue_scripts' );
function wp_dqs_admin_enqueue_scripts() {

	// Add CSS
	wp_enqueue_style( 'select2.css', plugins_url( 'css/select2.min.css', __FILE__ ) );
	wp_enqueue_style( 'custom_css', plugins_url( 'css/styles.css', __FILE__ ) );

	if ( is_rtl() ) {
		wp_enqueue_style( 'custom_css_rtl', plugins_url( 'css/rtl.css', __FILE__ ) );
	}

	// Add JS
	wp_enqueue_script( 'select2.js', plugins_url( 'js/select2.min.js', __FILE__ ) );
	wp_enqueue_script( 'jquery.cookie.js', plugins_url( 'js/jquery.cookie.js', __FILE__ ) );
	wp_enqueue_script( 'custom_js', plugins_url( 'js/scripts.js', __FILE__ ), array( 'jquery' ), '1.0' );

	// Localize Script
	wp_localize_script( 'custom_js', 'wp_dqs_Data', array(
		'admin_url' => admin_url(),
	) );
}

/** add box bottom of admin bar */
add_action( 'admin_notices', 'wp_dqs_select_box' );
function wp_dqs_select_box() {
	echo '
					
		<div class="wpdqs-search-box-wrap">
			<div class="wpdqs-seach-box-wrap-inner">
				<div class="wpdqs-seach-tip">
					<span>' . esc_html__( 'To perform a quick search, press Ctrl+Space bar', 'wp-dashboard-quick-search' ) . '</span>
				</div>
				<select class="wpdqs-search-box">
					<option>' . esc_html__( '-- Select --', 'wp-dashboard-quick-search' ) . '</option>
				</select>
			</div>
		</div>			
			
		<div class="wpdqs-search-box-btn-wrap">
			<button id="wpdqs-search-box-btn" type="button" class="button">' . esc_html__( 'Dashboard Quick Search', 'wp-dashboard-quick-search' ) . '</button>
		</div>
		
		<div class="clear"></div>

	';
}


