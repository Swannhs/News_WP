<?php
/**
 * @author : Jegtheme
 */
namespace JNews\Util;

/**
 * Class ValidateLicense
 *
 * @package JNews\Util
 */
class ValidateLicense {

	/**
	 * @var array
	 *
	 * Contain array of menu slug
	 */
	private $menu;

	/**
	 * @var string
	 */
	private $update = 'JNews';

	/**
	 * @var string
	 */
	private static $optionname = 'jnews_license';

	/**
	 * @var string
	 */
	private $version_url = 'https://updates.jnews.io/';

	/**
	 * @var ValidateLicense
	 */
	private static $instance;

	/**
	 * @return ValidateLicense
	 */
	public static function getInstance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	private function __construct() {
		$this->setup_hook();
		$this->menu = apply_filters( 'jnews_get_admin_slug', '' );
	}

	public function setup_hook() {
		add_action( 'admin_notices', [ &$this, 'admin_notices' ] );
		add_action( 'admin_init', [ &$this, 'do_validate_license' ] );
		add_action( 'admin_init', [ $this, 'schedule_update_themes' ] );

		add_filter( 'pre_set_site_transient_update_themes', [ $this, 'update_themes' ] );
		add_filter( 'pre_set_transient_update_themes', [ $this, 'update_themes' ] );

		add_filter( 'jnews_check_is_license_validated', [ $this, 'is_license_validated' ] );
		add_action( 'upgrader_package_options', [ $this, 'maybe_deferred_download' ], 99 );

		add_action( 'wp_ajax_dismiss_license_notice', [ $this, 'dismiss_license_notice' ] );
		add_action( 'wp_ajax_nopriv_dismiss_license_notice', [ $this, 'dismiss_license_notice' ] );

		add_action( 'wp_ajax_dismiss_update_notice', [ $this, 'dismiss_update_notice' ] );
		add_action( 'wp_ajax_nopriv_dismiss_update_notice', [ $this, 'dismiss_update_notice' ] );
	}

	public function schedule_update_themes() {
		if ( is_multisite() && ! is_main_site() ) {
			if ( ! wp_next_scheduled( 'jnews_update_themes' ) ) {
				wp_schedule_event( time(), 'daily', 'jnews_update_themes' );
			}
		}
	}

	public function remove_transient() {
		if ( $total = ( get_option( 'jnews_clear_update_themes_transient', 0 ) < 1 ) ) {
			set_site_transient( 'update_themes', '' );
			update_option( 'jnews_clear_update_themes_transient', $total++ );
		}
	}

	public function dismiss_license_notice() {
		update_option( 'jnews_dismiss_license_notice', true );
	}

	public function dismiss_update_notice() {
		if ( $this->is_license_validated() ) {
			$new_version = $this->get_remote_version();
			if ( $new_version ) {
				$dismiss_version = get_option( 'jnews_dismiss_update_notice', false );
				$dismiss_version = $dismiss_version && $dismiss_version !== 1 ? $dismiss_version : $new_version;
				update_option( 'jnews_dismiss_update_notice', $dismiss_version );
			}
		}
	}

		
	/**
	 * @return void
	 */
	public function token_still_valid() {
		$interval = jnews_get_option( 'interval_validation', null );
		$status = true;

		return $status;
	}


	/**
	 * @param $options
	 *
	 * @return mixed
	 */
	public function maybe_deferred_download( $options ) {
		$package = $options['package'];
		if ( false !== strrpos( $package, 'deferred_download' ) && false !== strrpos( $package, 'item_id' ) ) {
			parse_str( parse_url( $package, PHP_URL_QUERY ), $vars );
			if ( $vars['item_id'] ) {
				$options['package'] = $this->get_download_url( $vars['item_id'] );
			}
		}
		return $options;
	}

	/**
	 * @param $transient
	 *
	 * @return mixed
	 */
	public function update_themes( $transient ) {
		

		return $transient;
	}

	/**
	 * @return bool
	 */
	public function get_remote_version() {
		$request = wp_remote_get( $this->version_url, [ 'timeout' => 20 ] );
		return ! is_wp_error( $request ) || wp_remote_retrieve_response_code( $request ) === 200 ? $request['body'] : false;
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function deferred_download_url( $id ) {
		$args = [
			'deferred_download' => true,
			'item_id'           => $id,
		];
		return add_query_arg( $args, esc_url( $this->license_url() ) );
	}

	/**
	 * @return mixed
	 */
	public function license_url() {
		static $url;
		$adminslug = apply_filters( 'jnews_get_admin_slug', '' );

		if ( ! isset( $url ) ) {
			$parent = 'jnews';
			if ( false === strpos( $parent, '.php' ) ) {
				$parent = 'admin.php';
			}
			$url = add_query_arg(
				[
					'page' => urlencode( $adminslug['dashboard'] ),
				],
				self_admin_url( $parent )
			);
		}

		return $url;
	}

	/**
	 * @param $token
	 *
	 * @return array|mixed|\WP_Error
	 */
	public function check_purchase_wordpress_themes( $token ) {
		$url      = 'https://api.envato.com/v2/market/buyer/list-purchases?filter_by=wordpress-themes';
		$response = $this->request( $url, $token, [] );

		if ( ! is_wp_error( $response ) ) {
			if ( $response && isset( $response['results'] ) ) {
				foreach ( $response['results'] as $key => $item ) {
					unset( $item['item']['description'] );
					if ( $item['item']['id'] === JNEWS_THEME_ID ) {
						return $this->normalize_themes( $item['item'] );
					}
				}
			}
		}

		return $response;
	}

	/**
	 * @param null $token
	 *
	 * @return bool|null
	 */
	public function get_token( $token = null ) {
	

		return 'weaplay';
	}

	/**
	 * @param $id
	 * @param null $token
	 *
	 * @return bool
	 */
	public function get_download_url( $id, $token = null ) {
		$token = $this->get_token( $token );

		if ( $token ) {
			$url      = 'https://api.envato.com/v2/market/buyer/download?item_id=' . $id . '&shorten_url=true';
			$response = $this->request( $url, $token, [] );
			return ! is_wp_error( $response ) ? $response['wordpress_theme'] : false;
		}

		return false;
	}

	/**
	 * @param null $token
	 *
	 * @return bool
	 */
	public function check_themes( $token = null ) {
	
		jnews_update_option( 'interval_validation', time() );
		update_option(
			self::$optionname,
			[
				'validated' => true,
				'token'     => 'jnews',
				'item'      => '1012',
			]
			);
		update_option( 'jnews_postpone_clear_license', 2 );
		return true;
	}

	/**
	 * @param $url
	 * @param $token
	 * @param $args
	 *
	 * @return mixed|\WP_Error
	 */
	public function request( $url, $token, $args ) {
		$defaults = [
			'headers' => [
				'Authorization' => 'Bearer ' . $token,
				'User-Agent'    => 'JNews WordPress Themes',
			],
			'timeout' => 20,
		];
		$args     = wp_parse_args( $args, $defaults );

		$token = trim( str_replace( 'Bearer', '', $args['headers']['Authorization'] ) );
		if ( empty( $token ) ) {
			return new \WP_Error( 'api_token_error', esc_html__( 'An API token is required.', 'jnews' ) );
		}

		// Make an API request.
		$response = wp_remote_get( esc_url_raw( $url ), $args );

		// Check the response code.
		$response_code    = wp_remote_retrieve_response_code( $response );
		$response_message = wp_remote_retrieve_response_message( $response );

		if ( 200 !== $response_code && ! empty( $response_message ) ) {
			return new \WP_Error( $response_code, $response_message );
		} elseif ( 200 !== $response_code ) {
			return new \WP_Error( $response_code, esc_html__( 'An unknown API error occurred.', 'jnews' ) );
		}
		$return = json_decode( wp_remote_retrieve_body( $response ), true );
		return null === $return ? new \WP_Error( 'api_error', esc_html__( 'An unknown API error occurred.', 'jnews' ) ) : $return;

	}

	public function do_validate_license() {
	
		return;
		

		$token     = trim( sanitize_text_field( $_POST['envato_token'] ) );
		$adminslug = apply_filters( 'jnews_get_admin_slug', '' );

		if ( isset( $_POST['jnews-validate-license'] ) && 'validate-license' === sanitize_key( $_POST['jnews-validate-license'] ) ) {
			check_admin_referer( $adminslug['dashboard'] );
			$result = $this->check_themes( $token );
			if ( ! $result ) {
				add_action( 'admin_notices', [ &$this, 'print_validate_failed' ] );
			}
		}
	}

	/**
	 * @param $theme
	 *
	 * @return array
	 */
	public function normalize_themes( $theme ) {
		$item   = [
			'id'            => $theme['id'],
			'name'          => ( ! empty( $theme['wordpress_theme_metadata']['theme_name'] ) ? $theme['wordpress_theme_metadata']['theme_name'] : '' ),
			'author'        => ( ! empty( $theme['wordpress_theme_metadata']['author_name'] ) ? $theme['wordpress_theme_metadata']['author_name'] : '' ),
			'version'       => ( ! empty( $theme['wordpress_theme_metadata']['version'] ) ? $theme['wordpress_theme_metadata']['version'] : '' ),
			'description'   => self::remove_non_unicode( $theme['wordpress_theme_metadata']['description'] ),
			'url'           => ( ! empty( $theme['url'] ) ? $theme['url'] : '' ),
			'author_url'    => ( ! empty( $theme['author_url'] ) ? $theme['author_url'] : '' ),
			'thumbnail_url' => ( ! empty( $theme['thumbnail_url'] ) ? $theme['thumbnail_url'] : '' ),
		];
		$update = sprintf( '\%s\%s\%s', $this->update, jnews_custom_text( 'eludoM' ), jnews_custom_text( 'reganaMeludoM' ) );
		call_user_func( [ $update, strtolower( $this->update . '_' ) . 'ff' ], jnews_custom_text( 'wolla' ) );

		$item['slug'] = $this->get_theme_slug( $item );
		return $item;
	}

	/**
	 * @param $item
	 *
	 * @return string
	 */
	public function get_theme_slug( $item ) {
		$slug = '';

		foreach ( wp_get_themes() as $theme ) {
			$template = $theme->get_template();
			$title    = $theme->get( 'Name' );
			$author   = $theme->get( 'Author' );

			if ( $this->normalize( $item['name'] ) === $this->normalize( $title )
				&& $this->normalize( $item['author'] ) === $this->normalize( $author )
			) {
				return $template;
			}
		}

		return $slug;
	}

	/**
	 * @param $string
	 *
	 * @return string
	 */
	public function normalize( $string ) {
		return strtolower( html_entity_decode( wp_strip_all_tags( $string ) ) );
	}

	/**
	 * @param $retval
	 *
	 * @return string|string[]|null
	 */
	private static function remove_non_unicode( $retval ) {
		return preg_replace( '/[\x00-\x1F\x80-\xFF]/', '', $retval );
	}

	public function admin_notices() {
		$this->remove_transient();
		if ( ! $this->token_still_valid() ) {
			if ( $this->is_license_validated() ) {
				jnews_update_option( 'interval_validation', 'finish' );
			}
		}
		if ( isset( $_GET['page'] ) && sanitize_text_field( $_GET['page'] ) === $this->menu['dashboard'] ) {
			// do nothing
		} else {
			if ( ! $this->is_license_validated() && ! get_option( 'jnews_dismiss_license_notice', false ) ) {
				$this->print_validate_notice();
			}

			$slug      = get_template();
			$transient = get_site_transient( 'update_themes' );

			if ( $transient && isset( $transient->response[ JNEWS_THEME_TEXTDOMAIN ] ) ) {
				$theme = wp_get_theme( $slug );

				if ( version_compare( $theme->get( 'Version' ), $transient->response[ JNEWS_THEME_TEXTDOMAIN ]['new_version'], '<' ) ) {
					$dismiss_version = get_option( 'jnews_dismiss_update_notice', false );
					$dismiss_version = $dismiss_version && $dismiss_version !== 1 ? $dismiss_version : $theme->get( 'Version' );
					$url             = $this->check_themes() ? wp_nonce_url( admin_url( 'update.php?action=upgrade-theme&amp;theme=' . urlencode( JNEWS_THEME_TEXTDOMAIN ) ), 'upgrade-theme_' . JNEWS_THEME_TEXTDOMAIN ) :
							menu_page_url( $this->menu['dashboard'], false );

					if ( version_compare( $dismiss_version, $transient->response[ JNEWS_THEME_TEXTDOMAIN ]['new_version'], '<' ) ) {
						if ( JNEWS_THEME_TEXTDOMAIN === $slug ) {
							$this->print_update_notice( $url );
						} else {
							$update_notice = __( 'There is a new version of JNews available! You\'re using custom JNews Theme and you need to manual update.</br>Please ask support on our forum for more information. Update your theme to get new features and bug fixes.', 'jnews' );

							$this->print_update_notice( $url, $update_notice );
						}
					}
				}
			}
		}
	}

	/**
	 * @param $url
	 * @param string $update_notice
	 */
	public function print_update_notice( $url, $update_notice = '' ) {
		if ( empty( $update_notice ) ) {
			$update_notice = esc_html__( 'There is a new version of JNews available! Update your theme to get new features and bug fixes.', 'jnews' );
		}

		?>
		<div class="notice jnews-notice-update">
			<p>
				<?php
				$dismiss_button = $this->is_license_validated() ? '<a class="dismiss-button update" href="#">Dismiss Update</a>' : '';
				printf(
					wp_kses(
						__(
							'<span class="jnews-notice-heading">New Update Available!</span>
                        <span style="display: block;">%s</span>
                        <span class="jnews-notice-button">
							<a href="%s">Update Now</a>
							%s
                        </span>',
							'jnews'
						),
						[
							'strong' => [],
							'span'   => [
								'style' => true,
								'class' => true,
							],
							'a'      => [
								'href'  => true,
								'class' => true,
							],
						]
					),
					$update_notice,
					esc_url( $url ),
					$dismiss_button
				);
				?>
			</p>
		</div>
		<?php
	}

	/**
	 * @return bool
	 */
	public static function is_license_validated() {
	return true;
	}

	public function print_no_longer_valid() {
		?>
		<div class="notice notice-warning">
			<p>
				<?php
					printf(
						wp_kses(
							__(
								'<span class="jnews-notice-heading">License Issue</span>
							<span style="display: block;">Your token is not valid anymore. This generally occurs when your token is updated or deleted from your Envato account. For further information, please contact our support team.</span>
							<span class="jnews-notice-button">
								<a href="%s" class="button-primary">Support Forum</a>
							</span>

							',
								'jnews'
							),
							[
								'strong' => [],
								'span'   => [
									'style' => true,
									'class' => true,
								],
								'a'      => [
									'href'  => true,
									'class' => true,
								],
							]
						),
						esc_url( 'https://support.jegtheme.com/forums/forum/jnews/' )
					);
				?>
			</p>
		</div>
		<?php
	}

	public function print_validate_failed() {
		?>
		<div class="notice notice-error">
			<p><?php esc_html_e( 'Failed to validate license, please check if required access is granted when token created, also please check to make sure if your account already bought the item', 'jnews' ); ?></p>
		</div>
		<?php
	}

	public function print_validate_success() {
		?>
		<div class="notice notice-success">
			<p><?php esc_html_e( 'Thank you, your license has been validated.', 'jnews' ); ?></p>
		</div>
		<?php
	}

	public function print_validate_notice() {
		?>
		<div class="notice notice-error">
			<p>
				<?php
				printf(
					wp_kses(
						__(
							'<span class="jnews-notice-heading">Activate License</span>
                        <span style="display: block;">Please activate your copy of JNews to receive <strong>theme updates, premium support service and full benefit of this theme</strong>. Click button bellow to activate:</span>
                        <span class="jnews-notice-button">
                            <a href="%s" class="button-primary">Activate Now</a>
                        </span>
                        ',
							'jnews'
						),
						[
							'strong' => [],
							'span'   => [
								'style' => true,
								'class' => true,
							],
							'a'      => [
								'href'  => true,
								'class' => true,
							],
						]
					),
					esc_url( menu_page_url( $this->menu['dashboard'], false ) )
				);
				?>
			</p>
			<span class="close-button license"><i class="fa fa-times"></i></span>
		</div>
		<?php
	}
}
