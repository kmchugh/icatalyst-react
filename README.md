# @icatalyst/react
> Opinionated Library for rapid application development

## Creating a new application
While we are working towards making the icatalyst-react library an includable dependency as well
as creating a generator for the application skeleton, the steps required to create a new application are:

1. create a new repository for the application.
2. add the required files to the application structure.
3. Include the icatalyst react library as a submodule ```git submodule add https://github.com/kmchugh/icatalyst-react.git src/@icatalyst```
3. ```yarn install```

The initial structure of the application should be as follows:
* **app_dir/** - The repository root directory
  * **__mocks__/** - For jest mocking to enable tests to run headless
    * **fileMock.js/** - Used for injecting files into the build process during testing
    * **styleMock.js/** - Used for injecting styles into the build process during testing
  * **public/** - The static public directory for content
    * **assets/** - Static assets such as fonts that are included in the build
      * **css/** - Static css assets
      * **fonts/** - Static font assets
      * **iconfont/** - Static font assets for rendering icons
      * **images/** - Static images that can be referenced from code
        * **backgrounds/** - background images
        * **icons/** - images to use as the application icon
        * **placeholders/** - Static image placeholders that can be referenced from code
      * **logos/** - All versions of the application logo
    * **js/** - static js to include in the html
    * **android-icon...** - Various versions of the application icon for different platforms
    * **index.html** - the index.html template
    * **manifest.json** - the manifest template
    * **src/** - the source folder is described in more detail [here](#src_folder)
    * **.babelrc** - babel configuration
    * **.env** - environment variables
    * **.eslintrc** - eslint configuration
    * **.gitignore** - git patterns to ignore
    * **.gitlab-ci.yml** - gitlab build configuration
    * **env.js** - environment configuration
    * **jest.setup.js** - jest initialisation
    * **package.json** - dependency and package declarations
    * **paths.js** - path configuration for the build process
    * **README.md** - application specific readme
    * **tailwind.config.js** - tailwind configuration
    * **webpack.common.js** - webpack standard configuration for dev and prod
    * **webpack.dev.js** - webpack standard configuration overrides for dev
    * **webpack.prod.js** - webpack standard configuration overrides for prod


### <a name="src_folder">src folder content</a>

* **src/** - The source directory for all custom app code
  * **@icatalyst/** - The icatalyst react library, linked as a submodule
  * **app/** - Application specific source code
    * **common/** - code that is used across the entire app
      * **components/** - component definitions that are not module specific
      * **hooks/** - react hooks that are used throughout the app      
    * **main/** - The main application, contains the [module](#main_modules) definitions
      * **store/** - the main store definition, this should combine reducers from the various application modules
      * **module definitions.../** The modules for this application
    * **settings/** - Application [configuration and settings](#app_configuration)
      * **config/** - Application configuration
        * **applicationConfig.js** - Application specific overrides
        * **authRoles.js** - Authorisation roles mapping and overrides
        * **colors.js** - Default application colours
        * **contentConfig.js** - Configuration of available application modules
        * **index.js** - application configuration generator for use across build and code
        * **local.config.js** - not included in the git repo, local overrides for development
      * **layouts/** - Configuration of the layouts used within the application
        * **[various.layouts].js** - individual layout files
        * **index.js** - layout combiner
      * **navigation/** - Navigation (UI) configuration and overrides
      * **routes/** - Route configuration and overrides
      * **themes/** - Theme configuration and overrides
    * **store/** - [Application state](#app_store) configuration
    * **App.js** - Application initialisation, calls createApp on icatalyst library
    * **index.js** - Standard React entry point
    * **init.js** - Overrides during initialisation process
  * **sdks/** - any SDKs or services that are used across the app
  * **styles/** - [global styles](#global_styles) that are applied to the entire app
  * **utilities/** - any utility functions that are used across the entire app

### <a name="app_configuration">Configuration and Settings</a>

### <a name="theme">Variable Configuration</a>

app/settings/config/applicationConfig properties
  * **environment** - the environment that we are executing in, dev, prod, etc.
  * **title** The name of the application for display
  * **company_title** - The name of the company for the copyright
  * **company_logo** - The logo of the company for the copyright
  * **company_url** - link to the company website
  * **ga_tag_id** - ga tag for google analytics properties
  * **colors** - colors for palette generation
  * **singularity** - singularity configuration
    * **requireAuth** - if true or undefined will force authorisation flows, otherwise will route to default page
    * **client** - singularity client info
      * **root** - (optional) singularity application root url
      * **id** - client id
      * **key** - client key
      * **secret** - client secret
    * **server** - (optional) singularity api info
      * **root** - singularity api root url




### <a name="theme">Setting up Themes</a>

#### <a name="colours">Selecting Colours</a>
Colours are generated from a simple palette that is defined in app/main/settings/config/colors.js.

By providing a reference palette, a full themed palette will be generated with appropriate colours for light and dark themes.
The color palette should be similar to the following:

```
const colors = {
  primary: '#6f4021',
  secondary: '#678d58',
  complimentary: '#f4860f',
  info : '#2175EB',
  error: '#EB2C15',
  warning : '#EB6309',
  success : '#21EB84',
};

module.exports = colors;
```

These colours can then be used to generate a specific theme in the app/settings/themes folder.

A theme contains the following properties:
 * **default** - Optional, if no theme is specified on a layout themes with default true will be chosen.  
 * **defaultColorTint** - Optional, specifies how much the primary or secondary colour should be mixed with default generated colours such as paper, backgrounds, and greys.
 * **palette** - an object of a similar structure to the [colour definition](#colours).  This can also contain an additional key 'navigation_active_background' to override the active colour of the left hand navigation panel.
 * **typography** - The default font family as well as the font family to use for specific tags.  If using custom fonts they must be loaded through either the index.html or preferably through /src/styles/fonts.css

### <a name="main_modules">Modules</a>
Modules are intended to encapsulate responsibilities within the application.
Modules can refer to other modules and be embedded inside other modules.
Modules created directly under the /main folder are intended to contain functionality
that can be shared across the application, while modules created inside a module folder
should generally only be used by the containing module.

If you find yourself linking to modules that are contained within another module, you
should consider moving the contained module to a higher level.

Generally a module folder should have the name of the intent followed by module.
e.g. DashboardModule, UserManagementModule.
The folder should be structured as follows:

* MyModule - The root of the module
  * index.js - exports the route configuration for the module
  * store - the module redux store
    * actions - actions for this module
    * reducers - reducers for this module
  * components/ - contains any components that are specific to the module
  * +<Contained>Module - child modules that are only used by this module

If your module does have a store, it is typical to link that store in the
/src/main/store/index.js

This allows for separating modules functionally and only loading the required
modules when the application loads in the browser

### <a name="app_store">Application State</a>

### <a name="global_styles">Global Styles</a>

## Generating Navigation and Routes

### <a name="route_configuration">Route Configuration</a>

```
  {
    icon : <icon> (Optional), // Primary icon for this route
    name : <String>, // The name of this route
    title : <String> (Optional), // The name to display on links to this route
    component : <Component || Functional Component> (Optional), // The component to render for this route, if not defined, defaults to MasterDetail.  Use null for no compnent.
    path : <String> (Optional), // The path to get to this route
    paths : [<routeConfigurations>] (Optional), // The child paths for this route
    visible : <boolean || boolean:()=>{}> (Optional), // Function to determine if this route is visible, or boolean to hide in navigation
    defaultRoute : <boolean> (Optional), if set to true will navigate the user to this route on accessing the root url, see [Default Route](#default_route)
    auth : <String> || [<String>], The authorisation role or roles that have access to this route
  }
```

#### <a name="default_route">Default Route</a>
The initial Route is derived from the routes that are available to the user.  When the user enters the application through the default route, i.e. '/', the @icatalyst/components/Root component will redirect the user to the first route available to the user that has been marked as a defaultRoute, if no available routes are marked as a defaultRoute then the user will be directed to the first available route.  For information on Routes and configuration of routes see [route configuration](#route_configuration)
