This is a [Next.js](https://nextjs.org/) template with [Devextreme](https://js.devexpress.com/React/Documentation) components.

This Application Template was built using the same (but modified) components that Devextreme uses for their [React Application Template](https://js.devexpress.com/React/Documentation/Guide/React_Components/Application_Template/). It uses the default Outer Toolbar and includes a boiler plate for Auth.js so that you can use credentials or social accounts to login or register. Since NextJS is a full stack framework you can prevent pages
from being accessed from the server if a user does not log in and sample code is provided.

## Highlights

- Devextreme Form components are used to perform client-side form validations in the authorization flow, and NextJS server actions are used to pass form data directly to the server for processing (React useRef objects or useStates are not required on the client). This improves security and reduces client-side code.

- Dark/Light Mode theme selection is built in, and there are .dark-mode/.light-mode theme selector classes in the css/scss environment for extra fine tuning.

- NextJS server component animations are included using the motion library.

- Two NextJS routing groups were created to separate the authorization flow layout (unauthenticated layout) from the main application layout (authenticated layout). Both of these layouts are RootLayouts because they are significantly different from each other, and to ensure an automatic page refresh is performed after logging in and being redirected to the main application.

- This template was built using TypeScript

- You can preview this template at the following site: https://nextjsapptemplate.netlify.app/home

If you find this template useful please add a star.

## Getting Started

npm install

npx auth secret

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The app will automatically navigate to the home page which provides instructions on how to finish setting up the template and customizing it for your needs
