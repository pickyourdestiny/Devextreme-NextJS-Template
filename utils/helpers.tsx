import { EB_Garamond } from "next/font/google";

export const garamond = EB_Garamond({
  weight: "800",
  subsets: ["latin"],
});

const notes =
  "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you haven't met her, be certain to say hi.\r\n\r\n Sandra also has 2 daughters both of whom are accomplished gymnasts.";

export const defaultUser = {
  email: "sandra@example.com",
  name: "Sandra Johnson",
  image:
    "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png",
  id: 137354,
  firstName: "Sandra",
  lastName: "Johnson",
  prefix: "Mrs.",
  position: "Controller",
  picture: "images/employees/06.png",
  birthDate: new Date("1974/11/5"),
  hireDate: new Date("2005/05/11"),
  notes,
  address: "4600 N Virginia Rd.",
};


