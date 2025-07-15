// Chart color utilities for better contrast and automatic color generation

export const chartColors = {
  primary: [
    '#2563EB', // Blue 600
    '#DC2626', // Red 600
    '#059669', // Emerald 600
    '#D97706', // Amber 600
    '#7C3AED', // Violet 600
    '#DB2777', // Pink 600
    '#0891B2', // Cyan 600
    '#65A30D', // Lime 600
    '#C2410C', // Orange 600
    '#9333EA', // Purple 600
  ],
  secondary: [
    '#3B82F6', // Blue 500
    '#EF4444', // Red 500
    '#10B981', // Emerald 500
    '#F59E0B', // Amber 500
    '#8B5CF6', // Violet 500
    '#EC4899', // Pink 500
    '#06B6D4', // Cyan 500
    '#84CC16', // Lime 500
    '#F97316', // Orange 500
    '#A855F7', // Purple 500
  ],
  gradients: [
    ['#2563EB', '#3B82F6'], // Blue gradient
    ['#DC2626', '#EF4444'], // Red gradient
    ['#059669', '#10B981'], // Emerald gradient
    ['#D97706', '#F59E0B'], // Amber gradient
    ['#7C3AED', '#8B5CF6'], // Violet gradient
    ['#DB2777', '#EC4899'], // Pink gradient
    ['#0891B2', '#06B6D4'], // Cyan gradient
    ['#65A30D', '#84CC16'], // Lime gradient
  ]
};

export const getChartColor = (index: number, variant: 'primary' | 'secondary' = 'primary'): string => {
  const colors = chartColors[variant];
  return colors[index % colors.length];
};

export const getGradientColors = (index: number): [string, string] => {
  const gradients = chartColors.gradients;
  return gradients[index % gradients.length];
};

export const generateColorPalette = (count: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(getChartColor(i, 'primary'));
  }
  return colors;
};

// Custom tooltip styles for consistent appearance
export const customTooltipStyle = {
  backgroundColor: 'rgba(17, 24, 39, 0.95)', // Gray 900 with opacity
  border: '1px solid rgba(75, 85, 99, 0.3)', // Gray 600 with opacity
  borderRadius: '12px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  color: 'white',
  fontSize: '14px',
  fontWeight: '500',
  padding: '12px 16px',
  backdropFilter: 'blur(8px)',
};

export const customTooltipStyleLight = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  border: '1px solid rgba(229, 231, 235, 0.8)', // Gray 200
  borderRadius: '12px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  color: 'rgb(17, 24, 39)', // Gray 900
  fontSize: '14px',
  fontWeight: '500',
  padding: '12px 16px',
  backdropFilter: 'blur(8px)',
};