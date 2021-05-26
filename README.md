# @icatalyst/react
> Opinionated Library for rapid application development

## Creating the application
The application defines a default directory structure.  While this is under the control of the developer it is an easy way to organise files and function.

* **src/** - The source directory for all custom app code
  * **@icatalyst/** - The icatalyst react library, linked as a submodule
  * **app/** - Application specific source code
    * **main/** - The main application, contains the [module](#main_modules) definitions
    * **settings/** - Application [configuration and settings](#app_configuration)
    * **store/** - [Application state](#app_store) configuration
    * **App.js** - Application initialisation, usually calls createApp
    * **index.js** - Standard React entry point
  * **styles/** - [global styles](#global_styles) that are applied to the entire app

### <a name="app_configuration">Configuration and Settings</a>

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
