declare module 'chartjs-chart-wordcloud' {
  import { ChartType } from 'chart.js';

  interface WordCloudDataPoint {
    text: string;
    value: number;
    color?: string;
  }

  interface WordCloudOptions {
    minRotation?: number;
    maxRotation?: number;
    padding?: number;
    font?: {
      family?: string;
      weight?: string;
    };
    color?: (context: any) => string;
    fit?: boolean;
    hover?: {
      color?: string;
    };
  }

  declare const wordCloud: ChartType<'wordCloud', WordCloudDataPoint[], WordCloudOptions>;
  export default wordCloud;
} 