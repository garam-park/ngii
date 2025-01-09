import React from "react";
import axios from "axios";
import jsonAdapter from "axios-jsonp";

const apikey = import.meta.env.VITE_APP_NGII_API_KEY;

export default function useGeocoding() {
  const fetchResult = React.useCallback(async (juso: string) => {
    const target = "geo";
    // const target = "des";

    const refrnUrl = "http://localhost:5175";

    const apiUrl = "/openapi/search.json";
    const params = {
      target: target,
      apikey: apikey,
      refrnUrl: refrnUrl,
      juso: encodeURIComponent(juso),
      // juso,
    };

    return axios.get(apiUrl, {
      params: { ...params, callbackParamName: "callback" },
      adapter: jsonAdapter,
      // headers: { Accept: "application/json" },
    });
  }, []);

  return { fetchResult };
}
