import React from "react";
import ReactDOM from "react-dom";
import { loadYmaps } from "./loader";

const ymapsPromise = loadYmaps().then(async (ymaps3) => {
  const [ymaps3React] = await Promise.all([
    ymaps3.import("@yandex/ymaps3-reactify"),
    ymaps3.ready,
  ]);
  const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
  return {
    ymaps3,
    reactify,
    ...reactify.module(ymaps3),
  };
});

export { ymapsPromise };
