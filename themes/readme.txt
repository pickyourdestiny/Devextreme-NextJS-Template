Commands listed below were used to generate the base light and dark theme files that comes with this template.  
If you prefer to use a GUI and wizard you can always use the one available at https://devexpress.github.io/ThemeBuilder/

The following two commands will generate two css files based on the information in the input files 
(executed on the root directory of this app):

npx devextreme-cli build-theme  --input-file="./themes/metadata.lightmode.json"  --output-file="./themes/generated/theme.lightmode.css"
npx devextreme-cli build-theme  --input-file="./themes/metadata.darkmode.json"  --output-file="./themes/generated/theme.darkmode.css"

The second two commands below will regenerate two separate scss variable files:

npx devextreme-cli export-theme-vars --base-theme="theme.lightmode.css"  --base --output-file="./themes/generated/variables.lightmode.scss"
npx devextreme-cli export-theme-vars --base-theme="theme.darkmode.css"  --base --output-file="./themes/generated/variables.darkmode.scss"

documentation: https://js.devexpress.com/React/Documentation/Guide/Common/DevExtreme_CLI/#ThemeBuilder/Command-Line_Arguments

The next step is to copy the two generated css files to the /public directory, then open each file and ensure that the @font-face class
is commented out in both of them.

Now by default the default styling for that specific theme will automatically be applied when you switch themes at runtime.  If you want to
further customize the 'light' and 'dark' modes you can do so in the scss file for the component by calling the .dark-mode and .light-mode
classes. An example of this can be seen in the "SideNavigationMenu.scss" file located in the ('/app/components/layout/drawer/') directory.

The variables.base.scss file is manually created to mix the light mode and dark mode variables together (as shown within this file) so 
that you only need to use the one variables.modes.scss file in each component scss file to reference those variables. Again by default if
you switch between dark and light themes the default styling for each will be applied, but if you want to modify the base variables 
themselves (like $base-bg or $base-text-color) for specific elements than that is where this file comes into use. Make sure to specify
which mode you want to use these variables in as shown:

.some-component-element{

  .light-mode & {
    background-color: $base-bg-light-darker;
  }

  .dark-mode & {
    background-color: $base-bg-dark-lighter;
  }

}





