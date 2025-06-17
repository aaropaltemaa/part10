import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#ffffff',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 18,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System"
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;