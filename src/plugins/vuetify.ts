import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        primary: "#6A49E2",
        //Gray
        gray0: "#FDFEFE",
        gray1: "#F4F4F5",
        gray2: "#EAEAEB",
        gray3: "#DFDFE1",
        gray4: "#CACACE",
        gray5: "#B5B5BA",
        gray6: "#A0A0A6",
        gray7: "#8B8B92",
        gray8: "#77777E",
        gray9: "#636369",
        gray10: "#4F4F54",
        gray11: "#3B3B3F",
        gray12: "#2A2A2D",
        gray13: "#1E1E20",
        // prime
        prime2: "#A0A1A2",
        prime7: "#3D3D3D",

        mango: "#F6C453",
        blueJean: "#4DAAF8",

        silver: "#D3D3D3",
        gold: "#FFDF00",
        platinum: "#00CED1",
        diamond: "#B9F2FF",

        //config theme
        lightBackground: "#FFFFFF",
        darkBackground: "#1E1E20",
      },
    },
  },
});
