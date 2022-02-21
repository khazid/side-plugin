# Introducción

Side plugin Wordpress

Obtiene las propiedades del API https://api.simplyrets.com/properties 
las cuales pueden mostrarse en un listado responsivo en cualquier pagina dentro de Wordpress con el uso del shortcode [side_property_list]

Se hace uso de Bootstrap para el manejo responsivo

Las propiedades son mostradas usando Vue 3.2.31 y axios 

Para el almacenamiento en tiempo real se utiliza LocalStorage el cual guarda las propiedades cargadas desde le API y los id de las propiedas que se marcan como favoritos


# Instalación

Desde el Backoffice de Wordpress dirigirse a Plugins -> add new y subir el zip file del Side plugin

Ir a la pagina en la cual se quieran mostrar las propiedades y agregar el shortcode [side_property_list] 

Para verificar el localstorage, desde la pagina que muestra el listado de propiedades boton derecho del mouse e ir a la opcion de inspeccionar elemento, 
ir a la pestaña de Aplicacion y hacer click sobre la opcion de Storage -> LocalStorage ubicada a la izquierda del inspeccionador, aqui se podran apreciar 
dos Keys llamados "properties" y "likes" los cuales almacenan la informacion de las propiedades y de los ListingId de las propiedades marcadas como favorito.

# Descripción de cambios

Se realiza la modificacion basica del tema child a los colores de Side Inc. con el fin de tener una tematica acorde a la empresa
Las modificaciones de estilos se encuentran divididas para el tema y para el plugin haciendo uso de Scss de esta forma se puede usar de forma independiente el plugin
Se utiliza el plugin base de Side para generar un shortcode [side_property_list] el cual es llamado en la pagina Property listing del wordpress
Se hace una modificacion basica al Home orientada a Real estate 
Se instala Vue 3.2.31 dentro del plugin para el manejo del cambio de estado del favorito (marcar corazon de la propiedad) y el LocalStorage
Se realiza modificaciones del Webpack.config.js para el manejo de los svg haciendo uso de svg-inline-loader y la instalacion de Vue

La estructura de carpetas :
- side
  - components
    PropertyOptions.vue (componente para mostrar el html de las propiedades)
  - helpers
    getPropertyOptions.js (contiene las funciones para el formato de los datos fecha, precio y calculo de baños)
  - images (contiene los SVG para los favoritor)
  - pages
    PropertyPage.vue (componente padre donde se realiza la llamada de PropertyOptions, del API y el almacenamiento en LocalStorage)
  
  App.vue (Componente principal)
  scripts.js (inicializa y monta la app de vue)
  side.php (contiene la inicializacion del plugin para wordpress y la definicion del shortcode)
  
------------------------------------------------------------------------------------------------------------

# Introduction

WordPress Side plugin

Get the properties of the API https://api.simplyrets.com/properties
which can be displayed in a responsive listing on any page within Wordpress with the use of the [side_property_list] shortcode

Bootstrap is used for responsive handling

Properties are displayed using Vue 3.2.31 and axios

For real-time storage, LocalStorage is used, which saves the properties loaded from the API and the id of the properties that are marked as favorites.


# Installation

From the Wordpress Backoffice go to Plugins -> add new and upload the zip file of the Side plugin

Go to the page where you want to display the properties and add the shortcode [side_property_list]

To verify the localstorage, from the page that shows the list of properties, right-click and go to the option to inspect element,
go to the Application tab and click on the Storage -> LocalStorage option located on the left of the inspector, here you can see
two Keys called "properties" and "likes" which store the information of the properties and the ListingId of the properties marked as favorite.

# Description of changes

The basic modification of the child theme is made to the colors of Side Inc. in order to have a theme according to the company
The style modifications are divided for the theme and for the plugin using Scss in this way the plugin can be used independently
The Side base plugin is used to generate a shortcode [side_property_list] which is called on the WordPress Property listing page
A basic modification is made to the Home oriented to Real estate
Vue 3.2.31 is installed inside the plugin for the handling of the change of state of the favorite (mark the heart of the property) and the LocalStorage
Modifications of the Webpack.config.js are made for the handling of the svg using svg-inline-loader and the installation of Vue

The folder structure:
- side
  -components
    PropertyOptions.vue (component to display the html of the properties)
  - helpers
    getPropertyOptions.js (contains the functions for data format date, price and bathroom calculation)
  - images (contains the SVGs for the favorites)
  - pages
    PropertyPage.vue (parent component where the call of PropertyOptions, of the API and the storage in LocalStorage is made)
  
  App.vue (Main Component)
  scripts.js (initializes and mounts the vue app)
  side.php (contains the wordpress plugin initialization and shortcode definition)





