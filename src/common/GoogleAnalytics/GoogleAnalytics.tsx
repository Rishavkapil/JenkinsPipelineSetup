'use strict';

import { AW_TRACKING_ID, GA4_TRACKING_ID } from "@/constants";
import Script from "next/script";
import Head from "next/head";

const GoogleAnalytics = () => {

  if (!GA4_TRACKING_ID) {
    console.warn('Google Analytics tracking ID is not defined');
    return null;
  }

  return (
    <>
      {/* Meta Pixel Code */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '646466411109460');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=646466411109460&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-16885924229"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_TRACKING_ID}');
            gtag('config', '${AW_TRACKING_ID}');
            gtag('config', 'AW-16885924229');
          `,
        }}
      />
      {/* Google Ads Conversion Tracking */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {
              'send_to': 'AW-16885924229/dGwvCJSohKEaEIWD6_M-',
              'value': 1.0,
              'currency': 'INR'
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;