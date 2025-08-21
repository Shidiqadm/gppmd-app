import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DonutChart } from '@/src/components/charts/DonutChart';
import { BarChart } from '@/src/components/charts/BarChart';
import { PieChart } from '@/src/components/charts/PieChart';
import { globalPortfolioData } from '@/src/data/sampleData';

export default function PortfolioScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <View style={styles.logoIcon} />
            <Text style={styles.logoText}>DP WORLD</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.groupButton}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.groupText}>Group</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Group Portfolio</Text>
          <Text style={styles.subtitle}>Portfolio overview and metrics</Text>
        </View>

        {/* Portfolio Overview Cards */}
        <View style={styles.overviewSection}>
          <View style={styles.portfolioCards}>
            <View style={styles.portfolioCard}>
              <Ionicons name="briefcase-outline" size={32} color="white" />
              <Text style={styles.portfolioTitle}>Portfolio Projects</Text>
              <Text style={styles.portfolioValue}>{globalPortfolioData.portfolioProjects}</Text>
            </View>
            
            <View style={[styles.portfolioCard, { backgroundColor: '#10B981' }]}>
              <Ionicons name="trending-up-outline" size={32} color="white" />
              <Text style={styles.portfolioTitle}>Portfolio Value AFE</Text>
              <Text style={styles.portfolioValue}>{globalPortfolioData.portfolioValue.toFixed(1)} M</Text>
            </View>
          </View>
        </View>

        {/* Spent vs Committed Section */}
        <View style={styles.chartSection}>
          <DonutChart
            percentage={globalPortfolioData.spentVsCommitted.percentage}
            centerValue={`$${globalPortfolioData.spentVsCommitted.afeAmount}m`}
            centerLabel="AFE Amount"
            spentAmount={`$${globalPortfolioData.spentVsCommitted.spentAmount}M`}
            remainingAmount={`$${globalPortfolioData.spentVsCommitted.remainingAmount}M`}
            size={160}
          />
        </View>

        {/* AFE by Project Chart */}
        <View style={styles.chartSection}>
          <BarChart
            data={globalPortfolioData.afeByProject.map(item => ({
              name: item.name,
              value: item.value,
              color: '#4F46E5'
            }))}
            title="AFE by Project"
            height={200}
            showValues={true}
          />
        </View>

        {/* Project Schedule Status */}
        <View style={styles.chartSection}>
          <PieChart
            data={[
              { label: 'On Track', value: globalPortfolioData.scheduleStatus.onTrack, color: '#10B981' },
              { label: 'Recovered', value: globalPortfolioData.scheduleStatus.recovered, color: '#4F46E5' },
              { label: 'Delayed', value: globalPortfolioData.scheduleStatus.delayed, color: '#EF4444' }
            ]}
            title="Project Schedule Status"
            size={150}
            showLegend={true}
          />
        </View>

        {/* Key Metrics Section */}
        <View style={styles.metricsSection}>
          <Text style={styles.metricsTitle}>Key Portfolio Metrics</Text>
          
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              <Text style={styles.metricLabel}>On Track Projects</Text>
            </View>
            <Text style={styles.metricValue}>{globalPortfolioData.scheduleStatus.onTrack}%</Text>
            <Text style={styles.metricDescription}>Projects progressing as planned</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="trending-up" size={24} color="#4F46E5" />
              <Text style={styles.metricLabel}>Total Portfolio Value</Text>
            </View>
            <Text style={styles.metricValue}>${globalPortfolioData.portfolioValue.toFixed(1)}M</Text>
            <Text style={styles.metricDescription}>Combined value of all portfolio projects</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="pie-chart" size={24} color="#F59E0B" />
              <Text style={styles.metricLabel}>Budget Utilization</Text>
            </View>
            <Text style={styles.metricValue}>{globalPortfolioData.spentVsCommitted.percentage}%</Text>
            <Text style={styles.metricDescription}>Percentage of committed budget spent</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#10B981',
    borderRadius: 12,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  groupText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  overviewSection: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
  },
  portfolioCards: {
    flexDirection: 'row',
    gap: 12,
  },
  portfolioCard: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  portfolioTitle: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: '600',
  },
  portfolioValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  chartSection: {
    backgroundColor: 'white',
    marginTop: 8,
  },
  metricsSection: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
    marginBottom: 20,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 12,
    color: '#666',
  },
});
