import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Keyword {
  text: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
}

const COLORS = [
  '#2563eb', // Blue
  '#059669', // Emerald
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#4f46e5', // Indigo
  '#b91c1c', // Red
];

// Calculate word size using logarithmic scale
const calculateWordSize = (value: number, maxValue: number): number => {
  const minSize = 1;
  const maxSize = 4;
  const scale = Math.log(value + 1) / Math.log(maxValue + 1);
  return minSize + (maxSize - minSize) * scale;
};

// Get a random color from the palette
const getWordColor = (index: number): string => {
  return COLORS[index % COLORS.length];
};

// Calculate position on a sphere
const getSpherePosition = (
  containerWidth: number,
  containerHeight: number,
  wordWidth: number,
  wordHeight: number,
  angle: number,
  radius: number
): { x: number; y: number; rotate: number; scale: number } => {
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  // Convert angle to radians
  const rad = angle * Math.PI / 180;

  // Calculate position on sphere
  const x = centerX + radius * Math.cos(rad) - wordWidth / 2;
  const y = centerY + radius * Math.sin(rad) - wordHeight / 2;

  // Calculate rotation based on position
  const rotate = angle > 180 ? -30 : 30;

  // Scale words based on their y-position to create 3D effect
  const normalizedY = Math.abs(y - centerY) / (containerHeight / 2);
  const scale = 1 - normalizedY * 0.3; // Words further from center appear smaller

  return { x, y, rotate, scale };
};

// Check for collisions between words
const checkCollision = (rect1: DOMRect, rect2: DOMRect): boolean => {
  const padding = 15; // Increased padding for better spacing
  return !(
    rect1.right + padding < rect2.left - padding ||
    rect1.left - padding > rect2.right + padding ||
    rect1.bottom + padding < rect2.top - padding ||
    rect1.top - padding > rect2.bottom + padding
  );
};

export const KeywordTrendsChart = ({ data }: { data: Keyword[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<Map<string, DOMRect>>(new Map());
  const maxValue = Math.max(...data.map(item => item.value));

  // Sort words by value (largest first)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    wordsRef.current.clear();

    // Calculate base radius for sphere layout
    const baseRadius = Math.min(containerRect.width, containerRect.height) * 0.35;
    
    // Place words in a spiral pattern
    let angle = 0;
    const angleStep = 360 / sortedData.length;
    
    sortedData.forEach((word, index) => {
      const wordElement = container.children[index] as HTMLElement;
      if (!wordElement) return;

      const wordRect = wordElement.getBoundingClientRect();
      let attempts = 0;
      let placed = false;
      let currentRadius = baseRadius;

      // Try different positions until a non-overlapping spot is found
      while (!placed && attempts < 50) {
        const position = getSpherePosition(
          containerRect.width,
          containerRect.height,
          wordRect.width,
          wordRect.height,
          angle,
          currentRadius
        );

        // Update element position
        wordElement.style.transform = `
          translate(${position.x}px, ${position.y}px) 
          rotate(${position.rotate}deg) 
          scale(${position.scale})
        `;
        
        const newRect = wordElement.getBoundingClientRect();
        let hasCollision = false;

        // Check collision with all placed words
        for (const [, placedRect] of wordsRef.current) {
          if (checkCollision(newRect, placedRect)) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision) {
          wordsRef.current.set(word.text, newRect);
          placed = true;
        } else {
          // Adjust position for next attempt
          angle += angleStep / 2;
          currentRadius += baseRadius * 0.1;
          attempts++;
        }
      }

      // If word couldn't be placed after max attempts, place it anyway
      if (!placed) {
        const finalPosition = getSpherePosition(
          containerRect.width,
          containerRect.height,
          wordRect.width,
          wordRect.height,
          angle,
          currentRadius
        );
        wordElement.style.transform = `
          translate(${finalPosition.x}px, ${finalPosition.y}px) 
          rotate(${finalPosition.rotate}deg) 
          scale(${finalPosition.scale})
        `;
        wordsRef.current.set(word.text, wordElement.getBoundingClientRect());
      }

      angle += angleStep;
    });
  }, [sortedData]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Trending Keywords
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Most discussed topics in your content
        </p>
      </div>
      
      <div 
        ref={containerRef} 
        className="relative h-[600px] w-full"
        style={{ perspective: '1000px' }}
      >
        {sortedData.map((word, index) => (
          <motion.div
            key={word.text}
            className="absolute cursor-pointer transition-transform duration-300 hover:scale-110"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{
              fontSize: `${calculateWordSize(word.value, maxValue)}rem`,
              color: getWordColor(index),
              fontWeight: word.value > maxValue * 0.7 ? '600' : '400',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              willChange: 'transform',
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};