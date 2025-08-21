import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlobalMap } from '@/src/components/organisms/GlobalMap';
import { StatusCard } from '@/src/components/atoms/StatusCard';
import { RegionCard } from '@/src/components/atoms/RegionCard';
import { ProjectCard } from '@/src/components/atoms/ProjectCard';
import { regions, Region, BusinessEntity, Project } from '@/src/data/sampleData';

export default function RegionDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const [selectedEntity, setSelectedEntity] = useState<BusinessEntity | null>(null);
  const [activeTab, setActiveTab] = useState<'project' | 'portfolio'>('project');

  const region = regions.find(r => r.code === code?.toUpperCase());

  useEffect(() => {
    if (!region) {
      router.back();
    }
  }, [region]);

  if (!region) {
    return null;
  }

  const handleEntityPress = (entity: BusinessEntity) => {
    setSelectedEntity(entity);
  };

  const handleProjectPress = (project: Project) => {
    router.push(`/project/${project.id}`);
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

  const currentStats = selectedEntity ? {
    preProjects: selectedEntity.projects.filter(p => p.status === 'Pre Projects').length,
    initiating: selectedEntity.projects.filter(p => p.status === 'Initiating').length,
    planning: selectedEntity.projects.filter(p => p.status === 'Planning').length,
    executing: selectedEntity.projects.filter(p => p.status === 'Executing').length,
    closing: selectedEntity.projects.filter(p => p.status === 'Closing').length,
    closed: selectedEntity.projects.filter(p => p.status === 'Closed').length,
    total: selectedEntity.projects.length
  } : {
    preProjects: region.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Pre Projects').length, 0),
    initiating: region.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Initiating').length, 0),
    planning: region.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Planning').length, 0),
    executing: region.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Executing').length, 0),
    closing: region.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Closing').length, 0),
    closed: region.businessEntities.reduce((sum, entity) => 
      sum + entity.projects.filter(p => p.status === 'Closed').length, 0),
    total: region.projectCount
  };

  const displayProjects = selectedEntity ? selectedEntity.projects : 
    region.businessEntities.flatMap(entity => entity.projects);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.logo}>
            <View style={styles.logoIcon} />
            <Text style={styles.logoText}>DP WORLD</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.regionCode}>{region.code}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View style={styles.mapSection}>
          <GlobalMap
            regions={[region]}
            selectedRegion={region}
            onRegionPress={() => {}}
            style={styles.map}
          />
          
          {/* Business Entity Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.entityCardsContainer}
            contentContainerStyle={styles.entityCardsContent}
          >
            {region.businessEntities.map((entity) => (
              <RegionCard
                key={entity.id}
                code={entity.name.toUpperCase()}
                count={entity.projectCount}
                onPress={() => handleEntityPress(entity)}
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
                  {selectedEntity ? `${selectedEntity.name} Projects` : `${region.name} Projects`}
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

              {/* Project List */}
              {selectedEntity && (
                <View style={styles.projectList}>
                  <Text style={styles.projectListTitle}>
                    {selectedEntity.name} Projects
                  </Text>
                  {displayProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      status={project.status}
                      afe={project.afe}
                      completion={project.completion}
                      onPress={() => handleProjectPress(project)}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Portfolio Tab Content */}
          {activeTab === 'portfolio' && (
            <View style={styles.tabContent}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {selectedEntity ? `${selectedEntity.name} Portfolio` : `${region.name} Portfolio`}
                </Text>
              </View>
              
              <View style={styles.comingSoon}>
                <Ionicons name="construct-outline" size={48} color="#666" />
                <Text style={styles.comingSoonText}>Portfolio view coming soon</Text>
              </View>
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
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
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
    minWidth: 40,
    alignItems: 'flex-end',
  },
  regionCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F46E5',
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
  entityCardsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  entityCardsContent: {
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
  projectList: {
    marginTop: 16,
  },
  projectListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  comingSoon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});
