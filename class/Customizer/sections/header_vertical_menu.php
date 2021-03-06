<?php

$options = [];

$menu_list   = [];
$menu_list[] = esc_html__( 'Select menu', 'jnews' );

if ( $menus = \JNews\Util\Cache::get_menu() ) {
	foreach ( $menus as $menu ) {
		$menu_list[ $menu->slug ] = $menu->name;
	}
}

for ( $i = 1; $i <= 4; $i ++ ) {
	$options[] = [
		'id'    => 'jnews_header_vertical_menu_header_' . $i,
		'type'  => 'jnews-header',
		'label' => esc_html__( 'Vertical Menu ', 'jnews' ) . $i,
	];

	$options[] = [
		'id'              => 'jnews_header_vertical_menu_' . $i,
		'transport'       => 'postMessage',
		'default'         => '',
		'type'            => 'jnews-select',
		'label'           => esc_html__( 'Choose Vertical Menu ', 'jnews' ),
		'description'     => esc_html__( 'Choose menu for your vertical menu.', 'jnews' ),
		'multiple'        => 1,
		'choices'         => $menu_list,
		'partial_refresh' => [
			'jnews_header_vertical_menu' . $i => [
				'selector'        => '.jeg_header_wrapper',
				'render_callback' => function () {
					get_template_part( 'fragment/header/desktop-builder' );
				},
			],
		],
	];

	$options[] = [
		'id'          => 'jnews_header_vertical_menu_border_height_' . $i,
		'transport'   => 'postMessage',
		'default'     => 6,
		'type'        => 'jnews-slider',
		'label'       => esc_html__( 'Top Bar Border Top Height', 'jnews' ),
		'description' => esc_html__( 'Border height in px.', 'jnews' ),
		'choices'     => [
			'min'  => '0',
			'max'  => '20',
			'step' => '1',
		],
		'output'      => [
			[
				'method'   => 'inject-style',
				'element'  => ".jeg_header .jeg_vertical_menu.jeg_vertical_menu_{$i}",
				'property' => 'border-top-width',
				'units'    => 'px',
			],
		],
	];

	$options[] = [
		'id'          => 'jnews_header_vertical_menu_border_color_' . $i,
		'transport'   => 'postMessage',
		'default'     => '',
		'type'        => 'jnews-color',
		'label'       => esc_html__( 'Top Bar Border Top Color', 'jnews' ),
		'description' => esc_html__( 'Top bar border color.', 'jnews' ),
		'choices'     => [
			'alpha' => true,
		],
		'output'      => [
			[
				'method'   => 'inject-style',
				'element'  => ".jeg_header .jeg_vertical_menu.jeg_vertical_menu_{$i}",
				'property' => 'border-top-color',
			],
		],
	];

	$options[] = [
		'id'          => 'jnews_header_vertical_menu_link_color_' . $i,
		'transport'   => 'postMessage',
		'default'     => '',
		'type'        => 'jnews-color',
		'label'       => esc_html__( 'Link color', 'jnews' ),
		'description' => esc_html__( 'Link color for vertical menu.', 'jnews' ),
		'choices'     => [
			'alpha' => true,
		],
		'output'      => [
			[
				'method'   => 'inject-style',
				'element'  => ".jeg_header .jeg_vertical_menu.jeg_vertical_menu_{$i} a",
				'property' => 'border-top-color',
			],
		],
	];
}

return $options;