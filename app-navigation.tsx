export const navigation = [
  {
    text: "Home",
    path: "/home",
    icon: "home",
  },
  {
    text: "User Panel",
    icon: "folder",
    isExpanded: false,
    items: [
      {
        text: "Profile",
        path: "/profile",
        icon: "user",
      },
      {
        text: "Tasks",
        path: "/tasks",
        icon: "taskcomplete",
      },
    ],
  },
];
