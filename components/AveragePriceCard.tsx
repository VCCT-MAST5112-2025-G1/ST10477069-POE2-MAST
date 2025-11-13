import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

type AveragePriceCardProps = {
  courseType: string;
  avgPrice: number;
  courseCount: number;
};

export default function AveragePriceCard({ courseType, avgPrice, courseCount }: AveragePriceCardProps) {
  return (
    <View style={styles.averagePriceCard}>
      <Text style={styles.averagePriceLabel}>
        {courseType.charAt(0).toUpperCase() + courseType.slice(1)}
      </Text>
      {courseCount > 0 ? (
        <Text style={styles.averagePriceValue}>${avgPrice.toFixed(2)}</Text>
      ) : (
        <Text style={styles.averagePriceValue}>N/A</Text>
      )}
      <Text style={styles.averagePriceCount}>({courseCount} items)</Text>
    </View>
  );
}

