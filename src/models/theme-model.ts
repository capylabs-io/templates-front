import { FixedNumber } from "@ethersproject/bignumber";
export interface ThemeModel {
  id: string;
  backgroundUrl: string;
  type: string;
  cardColor: string;
  accentColor: string;
  navColor: string;
  coverImage: string;
  primaryColors: any;
  fonts: any;
  name: string;
  isDarkTheme: boolean;
  isDarkNav: boolean;
  rating: string;
  description: string;
  metadata: any;
  data: any;
  status: string;
  price: FixedNumber;
  discount: number;
  category: string;
  count: number;
}
