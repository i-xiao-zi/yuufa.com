import config from "@/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: '/searchor',
      destination: `${config.base_api}/searchor`
    }
  ]
};

export default nextConfig;
