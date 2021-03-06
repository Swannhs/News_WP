<?php

$options = [];

if ( defined( 'JNEWS_AUTOLOAD_POST' ) ) {
	$options[] = [
		'id'          => 'jnews_single_following_notice_autoload',
		'type'        => 'jnews-alert',
		'default'     => 'info',
		'label'       => esc_html__( 'Info', 'jnews' ),
		'description' => wp_kses( __( 'This feature disabled when you enabling <strong>JNews - Auto Load Next Post Plugin.</strong>', 'jnews' ), wp_kses_allowed_html() ),
	];
}

$options[] = [
	'id'              => 'jnews_single_following_video',
	'transport'       => 'postMessage',
	'default'         => false,
	'type'            => 'jnews-toggle',
	'label'           => esc_html__( 'Enable Following Video on Single Post', 'jnews' ),
	'description'     => esc_html__( 'enable this option to allow video to be following on single post.', 'jnews' ),
	'postvar'         => [
		[
			'redirect' => 'single_post_tag',
			'refresh'  => false,
		],
	],
	'partial_refresh' => [
		'jnews_single_following_video' => [
			'selector'        => '.jeg_feature_video_wrapper',
			'render_callback' => function () {
				$single = \JNews\Single\SinglePost::getInstance();

				return $single->featured_video();
			},
		],
	],
];

$options[] = [
	'id'              => 'jnews_single_following_video_position',
	'transport'       => 'postMessage',
	'default'         => 'top_right',
	'type'            => 'jnews-select',
	'label'           => esc_html__( 'Following Video Position', 'jnews' ),
	'description'     => esc_html__( 'choose where your video will show when scrolling. Sidebar will onl work with content with sidebar, not including custom template ', 'jnews' ),
	'multiple'        => 1,
	'choices'         => [
		'bottom_right' => esc_html__( 'Bottom Right', 'jnews' ),
		'bottom_left'  => esc_html__( 'Bottom Left', 'jnews' ),
		'top_right'    => esc_html__( 'Top Right', 'jnews' ),
		'top_left'     => esc_html__( 'Top Left', 'jnews' ),
		'sidebar'      => esc_html__( 'Sidebar', 'jnews' ),
	],
	'active_callback' => [
		[
			'setting'  => 'jnews_single_following_video',
			'operator' => '==',
			'value'    => true,
		],
	],
	'postvar'         => [
		[
			'redirect' => 'single_post_tag',
			'refresh'  => false,
		],
	],
	'partial_refresh' => [
		'jnews_single_following_video_position' => [
			'selector'        => '.jeg_feature_video_wrapper',
			'render_callback' => function () {
				$single = \JNews\Single\SinglePost::getInstance();

				return $single->featured_video();
			},
		],
	],
];

$options[] = [
	'id'              => 'jnews_single_following_top_position',
	'transport'       => 'postMessage',
	'default'         => 40,
	'type'            => 'jnews-slider',
	'label'           => esc_html__( 'Video Top Position', 'jnews' ),
	'description'     => esc_html__( 'set top position video when scroll effect appear', 'jnews' ),
	'choices'         => [
		'min'  => '0',
		'max'  => '120',
		'step' => '1',
	],
	'active_callback' => [
		[
			'setting'  => 'jnews_single_following_video',
			'operator' => '==',
			'value'    => true,
		],
		[
			'setting'  => 'jnews_single_following_video_position',
			'operator' => 'in',
			'value'    => [ 'top_right', 'top_left' ],
		],
	],
	'postvar'         => [
		[
			'redirect' => 'single_post_tag',
			'refresh'  => false,
		],
	],
	'output'          => [
		[
			'method'   => 'inject-style',
			'element'  => '.featured_video.floating.top_right .jeg_featured_video_wrapper, .featured_video.floating.top_left .jeg_featured_video_wrapper',
			'property' => 'top',
			'units'    => 'px',
		],
	],
];

return $options;
