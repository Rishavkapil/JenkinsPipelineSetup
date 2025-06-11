import type { Metadata } from "next";
import { Providers } from "@/lib/redux/providers";
import { Toaster } from "react-hot-toast";
import GoogleCaptchaWrapper from "@/common/ReCaptcha/reCaptchaWrapper";
import { cookies } from "next/headers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./global.scss";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/common/Loader"), {
  ssr: false,
});

const AppNavbar = dynamic(
  () => import("./(user)/(home)/components/Navbar/AppNavbar"),
  {
    ssr: false,
  }
);

const Footer = dynamic(
  () => import("./(user)/(home)/components/Footer/Footer"),
  {
    ssr: false,
  }
);

const GoogleAnalytics = dynamic(() => import("@/common/GoogleAnalytics/GoogleAnalytics"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Ozolio - Benefit from the Future of Live Streaming",
  description: "Decentralized Token Governed By The Community",
  keywords:
    "Ico application, Ico, Ico User,Decentralized Token , Cryptocurrency , token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const isLogin = (cookieStore.get("isLogin") as any)?.value;

  const token = (cookieStore.get("token") as any)?.value;
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body suppressHydrationWarning suppressContentEditableWarning>
        <GoogleCaptchaWrapper>
          <Providers>
            <Loader />
            {isLogin ? <AppNavbar isLogin={isLogin} /> : null}

            <Toaster />
            {children}
            {isLogin ? <Footer /> : null}
          </Providers>
        </GoogleCaptchaWrapper>
      </body>
    </html>
  );
}
