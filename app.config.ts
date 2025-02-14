export default {
  name: "Sudokuru",
  slug: "sudokuru",
  scheme: "sudokuru",
  owner: "sudokuru",
  version: "0.0.0",
  icon: "goldLogoNoText.png",
  platforms: ["ios", "android"],
  orientation: "portrait",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  web: {
    bundler: "metro",
  },
  ios: {
    bundleIdentifier: "sudokuru.vercel.app",
    supportsTablet: true,
  },
  android: {
    package: "sudokuru.vercel.app",
  },
  extra: {
    eas: {
      projectId: "23c4c607-ead6-4786-9a9c-03f57a97dac7",
    },
  },
};
