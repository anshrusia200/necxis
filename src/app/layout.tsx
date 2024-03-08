import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "@uploadthing/react/styles.css";
// or `v1X-appRouter` if you are using Next.js v1X
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
