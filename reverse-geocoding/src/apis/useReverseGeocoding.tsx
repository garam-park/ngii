import React from "react";
import $ from "jquery";

const apikey = import.meta.env.VITE_APP_NGII_API_KEY;

interface GeocodingResponse {
  search: Search;
}

interface Search {
  header: Header;
  contents: Content;
}

interface Content {
  geo: Geo;
}

interface Geo {
  adresTy: string;
  adres: string;
  bdMgtSn: string;
  pnu: string;
  x: string;
  y: string;
}

interface Header {
  responseCode: number;
  responseMessage: string;
  target: string;
  juso: string;
  totalCount: number;
}

export default function useReverseGeocoding() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchResult = React.useCallback(async (x: string, y: string) => {
    setLoading(true);
    $("#resultArea").html("");
    $.ajax({
      type: "GET",
      url: "http://map.ngii.go.kr/openapi/search.json",
      data: {
        target: "reverseGeo",
        apikey,
        x,
        y,
      },
      dataType: "jsonp",
      crossDomain: true,
      success: function (result) {
        console.log(result);
        setContent(JSON.stringify(result));
      },
      error: function (xhr, ajaxSettings, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        console.log(ajaxSettings);
      },
    });
  }, []);

  return { fetchResult, content, error, loading };
}
