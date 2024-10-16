/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.rosierfoods.com',
          port: '', // Leave empty for default port
         // pathname: 'src/app/contact/contact_location'
        },
      ],
    },
  };
  
  export default nextConfig;
  