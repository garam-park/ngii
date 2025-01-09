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

export default function useGeocoding() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<Content | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchResult = React.useCallback(async (juso: string) => {
    setLoading(true);
    $.ajax({
      type: "GET",
      url: "http://map.ngii.go.kr/openapi/search.json",
      data: {
        target: "geo",
        apikey,
        juso,
      },
      dataType: "jsonp",
      crossDomain: true,
      success: function (result: GeocodingResponse) {
        if (result.search.header.responseCode !== 0) {
          console.log(result.search);
          setError(result.search.header.responseMessage);
        } else {
          console.log(result.search);

          setContent(result.search.contents);
        }
      },
      error: function (xhr, ajaxSettings, thrownError) {
        setError(thrownError);
      },
      complete: function () {
        setLoading(false);
      },
    });
  }, []);

  return { fetchResult, content, error, loading };
}
