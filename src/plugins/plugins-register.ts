import _ from "lodash";
import Vue from "vue";

import { appRules, rules } from "./rules";
import { VueResponsiveComponents } from "vue-responsive-components";

export const pluginsRegister = () => {
  Vue.use({
    install: (Vue: any) => {
      Vue.prototype.$rules = rules;
      Vue.prototype.$appRules = appRules;
      Vue.prototype.$_empty = (any: any) => {
        return !_.isNumber(any) && (!any || _.isEmpty(any));
      };
      Vue.prototype.$_get = (any: any, path: string, defaultValue = "") => {
        return _.get(any, path, defaultValue);
      };
    },
  });
  // Vue.use(VueResponsiveComponents);
};
