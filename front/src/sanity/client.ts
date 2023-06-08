import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { Image } from "../interfaces/sanity_interfaces";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-05-20",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN_WRITE_READ,
  ignoreBrowserTokenWarning: true,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: Image) => builder.image(source);
