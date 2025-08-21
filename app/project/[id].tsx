import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProgressIndicator } from '@/src/components/atoms/ProgressIndicator';
import { DonutChart } from '@/src/components/charts/DonutChart';
import { regions, Project } from '@/src/data/sampleData';

const { width } = Dimensions.get('window');

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'site' | 'satellite' | 'map' | 'video'>('site');

  // Find the project across all regions and business entities
  const findProject = (): Project | null => {
    for (const region of regions) {
      for (const entity of region.businessEntities) {
        const project = entity.projects.find(p => p.id === id);
        if (project) return project;
      }
    }
    return null;
  };

  const project = findProject();

  useEffect(() => {
    if (!project) {
      router.back();
    }
  }, [project]);

  if (!project) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return '#F59E0B';
      case 'Pre Projects': return '#6B7280';
      case 'Executing': return '#10B981';
      case 'Closing': return '#EF4444';
      default: return '#4F46E5';
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000000).toFixed(0)}M`;
  };

  const formatLargeCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Sample images for demonstration
  const sitePhotos = [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
  ];

  const mainImage = 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=400&fit=crop';

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
          <Text style={styles.regionCode}>AMR</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Media Section */}
        <View style={styles.mediaSection}>
          {/* Tab Navigation */}
          <View style={styles.mediaTabContainer}>
            <TouchableOpacity
              style={[styles.mediaTab, activeTab === 'site' && styles.activeMediaTab]}
              onPress={() => setActiveTab('site')}
            >
              <Text style={[styles.mediaTabText, activeTab === 'site' && styles.activeMediaTabText]}>
                Site Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mediaTab, activeTab === 'satellite' && styles.activeMediaTab]}
              onPress={() => setActiveTab('satellite')}
            >
              <Text style={[styles.mediaTabText, activeTab === 'satellite' && styles.activeMediaTabText]}>
                Satellite Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mediaTab, activeTab === 'map' && styles.activeMediaTab]}
              onPress={() => setActiveTab('map')}
            >
              <Text style={[styles.mediaTabText, activeTab === 'map' && styles.activeMediaTabText]}>
                Map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mediaTab, activeTab === 'video' && styles.activeMediaTab]}
              onPress={() => setActiveTab('video')}
            >
              <Text style={[styles.mediaTabText, activeTab === 'video' && styles.activeMediaTabText]}>
                Video
              </Text>
            </TouchableOpacity>
          </View>

          {/* Main Image/Video Area */}
          <View style={styles.mainMediaContainer}>
            <Image source={{ uri: mainImage }} style={styles.mainImage} />
            <TouchableOpacity style={styles.fullscreenButton}>
              <Ionicons name="expand-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Thumbnail Strip */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
            contentContainerStyle={styles.thumbnailContent}
          >
            {sitePhotos.map((photo, index) => (
              <TouchableOpacity key={index} style={styles.thumbnail}>
                <Image source={{ uri: photo }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Project Info Section */}
        <View style={styles.projectInfoSection}>
          <View style={styles.projectHeader}>
            <View style={styles.projectTitleContainer}>
              <Text style={styles.projectName}>{project.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                <Text style={styles.statusText}>{project.status}</Text>
              </View>
            </View>
            <ProgressIndicator 
              percentage={project.completion} 
              size={80} 
              strokeWidth={8}
              color={getStatusColor(project.status)}
            />
          </View>

          {/* Update Summary */}
          <View style={styles.updateSummary}>
            <View style={styles.updateHeader}>
              <Text style={styles.updateTitle}>Update Summary</Text>
              <Text style={styles.lastUpdate}>Last Update : {project.lastUpdate}</Text>
            </View>
            <Text style={styles.updateText}>{project.description}</Text>
          </View>

          {/* Project Details */}
          <View style={styles.projectDetails}>
            <Text style={styles.sectionTitle}>Project Description</Text>
            <Text style={styles.descriptionText}>
              The explanation starts with unicode; an industry standard which creates the specification for thousands of different symbols and characters. All the characters that you see on your electronic devices, and printed in books, are likely specified by the unicode standard.
            </Text>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>GPPMD Section</Text>
                <Text style={styles.detailValue}>{project.gppmdSection}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Project Manager</Text>
                <View style={styles.managerContainer}>
                  <Text style={styles.detailValue}>{project.projectManager}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Project Class</Text>
              <Text style={styles.detailValue}>{project.projectClass}</Text>
            </View>
          </View>

          {/* AFE Section */}
          <View style={styles.afeSection}>
            <View style={styles.afeHeader}>
              <Text style={styles.afeTitle}>AFE</Text>
              <Text style={styles.afeCode}>{project.afeCode}</Text>
            </View>

            {/* Spent vs Committed Chart */}
            <DonutChart
              percentage={project.completion}
              centerValue={formatCurrency(project.afe)}
              centerLabel="AFE Amount"
              spentAmount={formatCurrency(project.spent)}
              remainingAmount={formatCurrency(project.totalAfeAmount - project.spent)}
              size={140}
            />

            {/* Financial Details Grid */}
            <View style={styles.financialGrid}>
              <View style={styles.financialRow}>
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Committed</Text>
                  <Text style={styles.financialValue}>{formatLargeCurrency(project.committed)}</Text>
                </View>
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Actual</Text>
                  <Text style={styles.financialValue}>{formatLargeCurrency(project.actual)}</Text>
                </View>
              </View>
              <View style={styles.financialRow}>
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Spent</Text>
                  <Text style={styles.financialValue}>{formatLargeCurrency(project.spent)}</Text>
                </View>
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Total AFE Amount</Text>
                  <Text style={styles.financialValue}>{formatLargeCurrency(project.totalAfeAmount)}</Text>
                </View>
              </View>
            </View>
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
  mediaSection: {
    backgroundColor: 'white',
  },
  mediaTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  mediaTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeMediaTab: {
    borderBottomColor: '#4F46E5',
  },
  mediaTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeMediaTabText: {
    color: '#4F46E5',
  },
  mainMediaContainer: {
    position: 'relative',
    height: 250,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fullscreenButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  thumbnailContainer: {
    paddingVertical: 16,
  },
  thumbnailContent: {
    paddingHorizontal: 16,
  },
  thumbnail: {
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: 80,
    height: 60,
    resizeMode: 'cover',
  },
  projectInfoSection: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  projectTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  projectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  updateSummary: {
    marginBottom: 24,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#666',
  },
  updateText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  projectDetails: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  managerContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  afeSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 24,
  },
  afeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  afeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  afeCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  financialGrid: {
    marginTop: 20,
  },
  financialRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  financialItem: {
    flex: 1,
    marginRight: 16,
  },
  financialLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  financialValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
