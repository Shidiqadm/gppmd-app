import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalMap } from '@/src/components/organisms/GlobalMap';
import { StatusCard } from '@/src/components/atoms/StatusCard';
import { RegionCard } from '@/src/components/atoms/RegionCard';
import { BarChart } from '@/src/components/charts/BarChart';
import { PieChart } from '@/src/components/charts/PieChart';
import { DonutChart } from '@/src/components/charts/DonutChart';
import { regions, globalProjectStats, globalPortfolioData, projectsByHoPm, hopmDistribution, Region } from '@/src/data/sampleData';

export default function HomeScreen() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeTab, setActiveTab] = useState<'project' | 'portfolio'>('project');

  const handleRegionPress = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleRegionCardPress = (region: Region) => {
    setSelectedRegion(region);
  };

  const resetToGlobal = () => {
    setSelectedRegion(null);
  };

  const getStatusCardColor = (status: string) => {
    switch (status) {
      case 'Pre Projects': return '#E5E7EB';
      case 'Initiating': return '#FEF3C7';
      case 'Planning': return '#FCD34D';
      case 'Executing': return '#10B981';
      case 'Closing': return '#F87171';
      case 'Closed': return '#4F46E5';
      default: return '#E5E7EB';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Pre Projects': return '#374151';
      case 'Initiating': return '#92400E';
      case 'Planning': return '#92400E';
      case 'Executing': return '#FFFFFF';
      case 'Closing': return '#FFFFFF';
      case 'Closed': return '#FFFFFF';
      default: return '#374151';
    }
  };

  const currentStats = selectedRegion ? {
    preProjects: selectedRegion.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Pre Projects').length, 0),
    initiating: selectedRegion.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Initiating').length, 0),
    planning: selectedRegion.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Planning').length, 0),
    executing: selectedRegion.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Executing').length, 0),
    closing: selectedRegion.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Closing').length, 0),
    closed: selectedRegion.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Closed').length, 0),
    total: selectedRegion.projectCount
  } : globalProjectStats;

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
        {/* Map Section */}
        <View style={styles.mapSection}>
          <GlobalMap
            regions={regions}
            selectedRegion={selectedRegion}
            onRegionPress={handleRegionPress}
            style={styles.map}
          />
          
          {/* Region Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.regionCardsContainer}
            contentContainerStyle={styles.regionCardsContent}
          >
            {regions.map((region) => (
              <RegionCard
                key={region.id}
                code={region.code}
                count={region.projectCount}
                onPress={() => handleRegionCardPress(region)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'project' && styles.activeTab]}
              onPress={() => setActiveTab('project')}
            >
              <Ionicons name="construct-outline" size={16} color={activeTab === 'project' ? '#4F46E5' : '#666'} />
              <Text style={[styles.tabText, activeTab === 'project' && styles.activeTabText]}>
                PROJECT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'portfolio' && styles.activeTab]}
              onPress={() => setActiveTab('portfolio')}
            >
              <Ionicons name="briefcase-outline" size={16} color={activeTab === 'portfolio' ? '#4F46E5' : '#666'} />
              <Text style={[styles.tabText, activeTab === 'portfolio' && styles.activeTabText]}>
                PORTFOLIO
              </Text>
            </TouchableOpacity>
          </View>

          {/* Project Tab Content */}
          {activeTab === 'project' && (
            <View style={styles.tabContent}>
              {/* Title */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {selectedRegion ? `${selectedRegion.name} Projects` : 'Group Projects'}
                </Text>
                <Text style={styles.totalCount}>Total : {currentStats.total}</Text>
              </View>

              {/* Status Cards Grid */}
              <View style={styles.statusGrid}>
                <View style={styles.statusRow}>
                  <StatusCard
                    title="Pre Projects"
                    count={currentStats.preProjects}
                    color={getStatusCardColor('Pre Projects')}
                    textColor={getStatusTextColor('Pre Projects')}
                  />
                  <StatusCard
                    title="Initiating"
                    count={currentStats.initiating}
                    color={getStatusCardColor('Initiating')}
                    textColor={getStatusTextColor('Initiating')}
                  />
                  <StatusCard
                    title="Planning"
                    count={currentStats.planning}
                    color={getStatusCardColor('Planning')}
                    textColor={getStatusTextColor('Planning')}
                  />
                </View>
                <View style={styles.statusRow}>
                  <StatusCard
                    title="Executing"
                    count={currentStats.executing}
                    color={getStatusCardColor('Executing')}
                    textColor={getStatusTextColor('Executing')}
                  />
                  <StatusCard
                    title="Closing"
                    count={currentStats.closing}
                    color={getStatusCardColor('Closing')}
                    textColor={getStatusTextColor('Closing')}
                  />
                  <StatusCard
                    title="Closed"
                    count={currentStats.closed}
                    color={getStatusCardColor('Closed')}
                    textColor={getStatusTextColor('Closed')}
                  />
                </View>
              </View>

              {/* Charts */}
              <BarChart
                data={projectsByHoPm}
                title="Total Projects AFE By HO PM"
                height={180}
              />

              <PieChart
                data={hopmDistribution}
                title="No of Projects per HO PM"
                size={140}
              />
            </View>
          )}

          {/* Portfolio Tab Content */}
          {activeTab === 'portfolio' && (
            <View style={styles.tabContent}>
              {/* Title */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Group Portfolio</Text>
              </View>

              {/* Portfolio Cards */}
              <View style={styles.portfolioCards}>
                <View style={styles.portfolioCard}>
                  <Ionicons name="briefcase-outline" size={24} color="#4F46E5" />
                  <Text style={styles.portfolioTitle}>Portfolio Projects</Text>
                  <Text style={styles.portfolioValue}>{globalPortfolioData.portfolioProjects}</Text>
                </View>
                
                <View style={styles.portfolioCard}>
                  <Ionicons name="trending-up-outline" size={24} color="#10B981" />
                  <Text style={styles.portfolioTitle}>Portfolio Value AFE</Text>
                  <Text style={styles.portfolioValue}>{globalPortfolioData.portfolioValue.toFixed(1)} M</Text>
                </View>
              </View>

              {/* Spent vs Committed Chart */}
              <DonutChart
                percentage={globalPortfolioData.spentVsCommitted.percentage}
                centerValue={`$${globalPortfolioData.spentVsCommitted.afeAmount}m`}
                centerLabel="AFE Amount"
                spentAmount={`$${globalPortfolioData.spentVsCommitted.spentAmount}M`}
                remainingAmount={`$${globalPortfolioData.spentVsCommitted.remainingAmount}M`}
              />

              {/* AFE by Project Chart */}
              <BarChart
                data={globalPortfolioData.afeByProject.map(item => ({
                  name: item.name,
                  value: item.value,
                  color: '#4F46E5'
                }))}
                title="Afe by Project"
                height={180}
              />

              {/* Schedule Status */}
              <PieChart
                data={[
                  { label: 'On Track', value: globalPortfolioData.scheduleStatus.onTrack, color: '#10B981' },
                  { label: 'Recovered', value: globalPortfolioData.scheduleStatus.recovered, color: '#4F46E5' },
                  { label: 'Delayed', value: globalPortfolioData.scheduleStatus.delayed, color: '#EF4444' }
                ]}
                title="Project Schedule Status"
                size={140}
              />
            </View>
          )}
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
  mapSection: {
    height: 300,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  regionCardsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  regionCardsContent: {
    paddingHorizontal: 16,
  },
  contentSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
    minHeight: 600,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#4F46E5',
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalCount: {
    fontSize: 14,
    color: '#666',
  },
  statusGrid: {
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  portfolioCards: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  portfolioCard: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  portfolioTitle: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginVertical: 8,
  },
  portfolioValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
