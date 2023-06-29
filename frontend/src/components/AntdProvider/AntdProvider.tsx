import ConfigProvider from "antd/es/config-provider";
import theme from "antd/es/theme";
import koKR from "antd/locale/ko_KR";
import { useEffect, useState } from "react";

export default function AntdProvider({ children }: React.PropsWithChildren) {
  // const [device, setDevice] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // const isDesktop = useMediaQuery({ minWidth: 1281 });
  // const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1280 });
  // const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
    return () =>
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
  }, []);

  // useEffect(() => {
  //   setDevice((isDesktop && "desktop") || (isTablet && "tablet") || (isMobile && "mobile"));
  //   setIsDarkMode(_isDarkMode);
  // }, [isDesktop, isTablet, isMobile, _isDarkMode]);

  // const state = useMemo(() => ({ device, isDarkMode }), [device, isDarkMode]);

  // console.log(
  //   `<ThemeProvider> isDesktop: ${isDesktop}, isTablet: ${isTablet}, isMobile: ${isMobile}, isDarkMode: ${isDarkMode}`
  // );

  return (
    // <ThemeContext.Provider value={state}>
    <ConfigProvider
      locale={koKR}
      form={{
        validateMessages: {
          required: "빈칸을 채워주세요",
          types: { email: "이메일을 올바르게 입력하세요" },
        },
      }}
      theme={{
        token: {
          fontFamily: "Pretendard, -apple-system, sans-serif",
          fontSize: 15,
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
    // </ThemeContext.Provider>
  );
}
