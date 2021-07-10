<?php

$options = [];

$options[] = [
	'id'          => 'jnews_youtube_api',
	'transport'   => 'refresh',
	'default'     => '',
	'type'        => 'jnews-text',
	'label'       => esc_html__( 'Youtube API', 'jnews' ),
	'description' => sprintf(
		__( 'Insert your youtube API right here. For more information, <a href="%s">please go here</a>', 'jnews' ),
		'https://developers.google.com/youtube/v3/getting-started'
	),
];


$options[] = [
	'id'          => 'jnews_enable_recaptcha',
	'transport'   => 'postMessage',
	'default'     => false,
	'type'        => 'jnews-toggle',
	'label'       => esc_html__( 'Enable Recaptcha', 'jnews' ),
	'description' => esc_html__( 'Enable this feature to use recaptcha on login section.', 'jnews' ),
];

$options[] = [
	'id'              => 'jnews_recaptcha_site_key',
	'transport'       => 'refresh',
	'default'         => '',
	'type'            => 'jnews-text',
	'label'           => esc_html__( 'Google Recaptcha Site Key', 'jnews' ),
	'description'     => sprintf(
		__( 'Create your recaptcha site key, <a href="%s">please go here</a>', 'jnews' ),
		'https://www.google.com/recaptcha/admin'
	),
	'active_callback' => [
		[
			'setting'  => 'jnews_enable_recaptcha',
			'operator' => '==',
			'value'    => true,
		],
	],
];

$options[] = [
	'id'              => 'jnews_recaptcha_secret_key',
	'transport'       => 'refresh',
	'default'         => '',
	'type'            => 'jnews-text',
	'label'           => esc_html__( 'Google Recaptcha Secret Key', 'jnews' ),
	'description'     => sprintf(
		__( 'Create your recaptcha site key, <a href="%s">please go here</a>', 'jnews' ),
		'https://www.google.com/recaptcha/admin'
	),
	'active_callback' => [
		[
			'setting'  => 'jnews_enable_recaptcha',
			'operator' => '==',
			'value'    => true,
		],
	],
];

return $options;