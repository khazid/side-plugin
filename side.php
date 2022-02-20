<?php
/*
Plugin Name: Side
Version: 1.0.0
Author: Side
License: GPLv2 or later
Text Domain: side
*/

if ( ! function_exists('side_plugin_setup') ) {

    add_action( 'wp_enqueue_scripts', 'side_plugin_setup' );

    function side_plugin_setup() {
        wp_enqueue_style(
            'side-plugin-styles',
            plugin_dir_url(__FILE__) . 'style.scss',
            [],
            filemtime(plugin_dir_path( __FILE__ ) . '/build/style.css')
        );
    
        wp_enqueue_script( 
            'side-plugin-scripts', 
            plugin_dir_url(__FILE__) . 'scripts.js',
            array( 'jquery' ),
            filemtime(plugin_dir_path( __FILE__ ) . '/build/scripts.js'),
            true
        );

        wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js', [], '2.5.17');
        
    }
}

function side_property_listing_show($atts) {

    return '
    <div id="app">
    </div>';

    $properties= get_properties_from_api();
    $Content = '<!-- Listing items -->
        <div id="app">
        </div>
                <div class="carousel-item active property-listing">
                    <div class="property-listing-title">
                        <h3>Property Listings</h3>
                    </div>
                    <div class="container">
                    <div class="row">';
    
    foreach( $properties as $property ){

    
	$Content .= '
                    <div class="col-lg-4 d-lg-block prop-item">
                        <div class="card">
                        <img
                            src="'.$property['photo'][0].'"
                            class="card-img-top"
                            alt="Waterfall"
                        />
                        <div class="property-heart" data-id="'.$property['listingId'].'"></div>
                        <div class="card-body">
                            <ul class="property-spec">
                                <li>'.$property['bedrooms'].' BR</li>
                                <li>'.$property['bath'].' Bath</li>
                                <li>'.$property['area'].' Sq Ft</li>
                            </ul>
                            <h5 class="card-price">$'.number_format($property['price'],0,'.',',').'</h5>
                            <p class="card-text">'.$property['address'].'</p>
                            <span class="card-date">Listed: '.date('m/d/y',strtotime($property['listdate'])).'</span>
                        </div>
                        </div>
                    </div>
          ';
	
    }

    $Content .= '       </div>    
                    </div>
                </div>
                <!-- Listing items -->';
    return $Content;
}

function get_properties_from_api(){
    $args = array(
        'headers' => array(
          'Authorization' => 'Basic ' . base64_encode( 'simplyrets' . ':' . 'simplyrets' )
        )
      );
    $url = 'https://api.simplyrets.com/properties';
      
    $response = wp_remote_request( $url, $args );

    if ( is_array( $response ) && ! is_wp_error( $response ) ) {
        $headers = $response['headers']; // array of http header lines
        $body    = $response['body']; // use the content
    }
    
    $properties   = json_decode($body);
    $proparr        = [];
    $propelem        = [];
    
    foreach( $properties as $property ){

        array_push($proparr, [
           "photo" => $property->photos,
           "bath" => $property->property->bathsFull,
           "bedrooms" => $property->property->bedrooms,
           "area" => $property->property->area,
           "price" => $property->listPrice,
           "listdate" => $property->listDate,
           "address" => $property->address->full,
           "listingId" => $property->listingId
        ]);

    }
    return $proparr;
    
}

add_shortcode('side_property_list', 'side_property_listing_show');