import memoize from "memoize-one";
import { wrapPromise } from "./wrapPromise";
import { tvMetadata } from "./data";

const API_TIMEOUT = 1000;

export const tvMetadataApi = memoize(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tvMetadata);
    }, API_TIMEOUT);
  });
});

export const getTvMetadataResource = memoize(() => {
  return wrapPromise(tvMetadataApi());
});
