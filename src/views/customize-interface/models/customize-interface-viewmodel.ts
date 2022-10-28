import { action, observable } from "mobx";

export class CustomizeInterfaceViewmodel {
  @observable sortBy: any = ["All", "Free", "Premium"];
  @observable searchKey?: string;

  @observable page?: number = 1;
  @observable totalPage?: number = 1;

  @observable primaryColor?: string;
  @observable drawer = true;

  @observable mediaIcons = [
    {
      icon: "mdi-twitter",
      value: "twitter",
    },
    {
      icon: "mdi-facebook",
      value: "facebook",
    },
    {
      icon: "mdi-discord",
      value: "discord",
    },
    {
      icon: "mdi-telegram",
      value: "telegram",
    },
  ];

  swatches = [
    ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5"],
    ["#8b5aff", "#a27bff", "#b99cff", "#d0bdff", "#e8deff"],
    ["#51e5db", "#74ebe3", "#96f0ea", "#b9f5f1", "#dcfaf8"],
    ["#ffa51a", "#ffb748", "#ffc976", "#ffdba3", "#ffedd1"],
  ];
}
