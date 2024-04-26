/**
 * This is an enhencer for moment.js library.
 * @auther: Ziya Karagöz
 * @date: 02.01.2024
 * @website: https://www.ziyakaragoz.com
 * @github: github.com/ziya-karagoz
 */

import moment from "moment";

let selectedLang = "tr";

// We only support turkish and English which is default language of moment.js library.
// Therefore we can assume that if selectedLang is not turkish then it is English.
// but if user initialize the app for the first time, selectedLang will be undefined.
// In this case we have to look for navigator.language.split("-")[0] and if it is not turkish then it is English.
// otherwise we will use turkish as default language.

if (!selectedLang) {
  selectedLang = navigator.language.split("-")[0] !== "tr" ? "en" : "tr";
}

if (selectedLang === "tr") {
  moment.locale("tr", {
    months:
      "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split(
        "_"
      ),
    monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
    monthsParseExact: true,
    weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_cuma_Cumartesi".split(
      "_"
    ),
    weekdaysShort: "paz_pts_sal_çar_per_cum_cts".split("_"),
    weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Bugün saat] LT",
      nextDay: "[Yarın saat] LT",
      nextWeek: "dddd [saat] LT",
      lastDay: "[Dün saat] LT",
      lastWeek: "[Geçen] dddd [saat] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "%s sonra",
      past: "%s önce",
      s: "birkaç saniye",
      m: "bir dakika",
      mm: "%d dakika",
      h: "bir saat",
      hh: "%d saat",
      d: "bir gün",
      dd: "%d gün",
      M: "bir ay",
      MM: "%d ay",
      y: "bir yıl",
      yy: "%d yıl",
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: function (number) {
      return number + ".";
    },
    meridiemParse: /ÖÖ|ÖS/,
    isPM: function (input) {
      return input === "ÖS";
    },
    meridiem: function (hours, _, __) {
      return hours < 12 ? "ÖÖ" : "ÖS";
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
  });
}

export default moment;
