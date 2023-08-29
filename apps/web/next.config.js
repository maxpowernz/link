module.exports = {
 reactStrictMode: true,
//  transpilePackages: ['@fmg/ui'],
 webpack(config) {
   config.experiments = {
     ...config.experiments,
     topLevelAwait: true,
     layers: true,
   };
   config.module.rules.push({
     test: /\.svg$/i,
     issuer: /\.[jt]sx?$/,
     use: ['@svgr/webpack'],
   });
   return config;
 },
};