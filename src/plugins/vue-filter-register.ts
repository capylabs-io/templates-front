import moment from "moment";
import Vue from "vue";
import { get, isNumber, isEmpty, round } from "lodash-es";
import { FixedNumber } from "@ethersproject/bignumber";

export const vueFilterRegister = () => {
  Vue.filter("date", (isoStr: string, format: string) => (isoStr ? moment(isoStr).format(format) : ""));
  Vue.filter("round", (number: any, precision = 5) => {
    if (typeof number === "number") return number ? round(number, precision) : "0";
    if (number instanceof FixedNumber) {
      const rouned = number.round(precision).toString();
      return rouned.endsWith(".0") ? rouned.replace(".0", "") : rouned;
    }
    return number;
  });
  Vue.filter("datetime", (isoStr: string, format = "lll") => (isoStr ? moment(isoStr).format(format) : ""));
  Vue.filter("ddmmyyyy", (isoStr: string) => (isoStr ? moment(isoStr).format("DD/MM/YYYY") : ""));
  Vue.filter("ddmmyyyyhhmmss", (isoStr: string) =>
    isoStr ? moment(isoStr).format("DD/MM/YYYY HH:mm:ss") : ""
  );
  Vue.filter("truncateAddress", (address = "", start = 5, end = 4) => {
    if (!address) return "";
    return address.substr(0, start) + "..." + address.substr(address.length - end, end);
  });
  Vue.filter("normalizeTimeDuration", (timestamp) => {
    if (!timestamp) return "TBA";
    const duration = timestamp - Date.now();
    const arr = ["year", "month", "week", "minute", "second"];
    for (const i of arr) {
      const unitTime = i as moment.unitOfTime.Base;
      const normalizeDuration = Math.trunc(moment.duration(duration).as(unitTime));
      if (normalizeDuration != 0) {
        const res = moment.duration(normalizeDuration, unitTime).humanize();
        return duration >= 0 ? res : `${res} ago`;
      }
    }
    return "a few seconds ago";
  });

  Vue.filter("shortNumber", (number: any) => {
    if (number instanceof FixedNumber) {
      number = number.toUnsafeFloat();
    } else {
      number = +(number || "0");
    }
    return abbreviateNumber(number);
  });

  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  function abbreviateNumber(number) {
    // what tier? (determines SI symbol)
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return round(number, 1);

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return `${round(scaled, 1)}${suffix}`;
  }

  Vue.filter("_get", (any: any, path: string, defaultValue = "") => {
    return get(any, path, defaultValue);
  });
  Vue.filter("_empty", (any: any) => {
    return !isNumber(any) && (!any || isEmpty(any));
  });
  Vue.filter("_hasValue", (any: any) => {
    return isNumber(any) || (any && !isEmpty(any));
  });
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  Vue.filter("usd", (number: any) => {
    if (+number === 0) return `$${number}`;
    if (!isNaN(+number) && +number !== 0) return formatter.format(+number);
    return number;
  });
  Vue.filter("formatNumber", (number: any, maximumFractionDigits = 5) => {
    const nf = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: maximumFractionDigits,
    });
    return nf.format(number);
  });
  Vue.filter("twoDigits", (value) => {
    if (value < 0) {
      return "00";
    }
    if (value.toString().length <= 1) {
      return `0${value}`;
    }
    return value;
  });
};
