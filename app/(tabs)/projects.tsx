import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProjectCard } from '@/src/components/atoms/ProjectCard';
import { StatusCard } from '@/src/components/atoms/StatusCard';
import { regions, globalProjectStats } from '@/src/data/sampleData';

export default function ProjectsScreen() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Get all projects from all regions
  const allProjects = regions.flatMap(region => 
    region.businessEntities.flatMap(entity => entity.projects)
  );

  const filteredProjects = selectedStatus 
    ? allProjects.filter(project => project.status === selectedStatus)
    : allProjects;

  const handleProjectPress = (projectId: string) => {
    router.push(`/project/${projectId}`);
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
          <Text style={styles.title}>All Projects</Text>
          <Text style={styles.subtitle}>Total: {allProjects.length} projects</Text>
        </View>

        {/* Status Filter Cards */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filter by Status</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusRow}>
              <TouchableOpacity
                style={[styles.filterCard, selectedStatus === 'Pre Projects' && styles.selectedFilter]}
                onPress={() => setSelectedStatus(selectedStatus === 'Pre Projects' ? null : 'Pre Projects')}
              >
                <StatusCard
                  title="Pre Projects"
                  count={globalProjectStats.preProjects}
                  color={getStatusCardColor('Pre Projects')}
                  textColor={getStatusTextColor('Pre Projects')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterCard, selectedStatus === 'Initiating' && styles.selectedFilter]}
                onPress={() => setSelectedStatus(selectedStatus === 'Initiating' ? null : 'Initiating')}
              >
                <StatusCard
                  title="Initiating"
                  count={globalProjectStats.initiating}
                  color={getStatusCardColor('Initiating')}
                  textColor={getStatusTextColor('Initiating')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterCard, selectedStatus === 'Planning' && styles.selectedFilter]}
                onPress={() => setSelectedStatus(selectedStatus === 'Planning' ? null : 'Planning')}
              >
                <StatusCard
                  title="Planning"
                  count={globalProjectStats.planning}
                  color={getStatusCardColor('Planning')}
                  textColor={getStatusTextColor('Planning')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.statusRow}>
              <TouchableOpacity
                style={[styles.filterCard, selectedStatus === 'Executing' && styles.selectedFilter]}
                onPress={() => setSelectedStatus(selectedStatus === 'Executing' ? null : 'Executing')}
              >
                <StatusCard
                  title="Executing"
                  count={globalProjectStats.executing}
                  color={getStatusCardColor('Executing')}
                  textColor={getStatusTextColor('Executing')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterCard, selectedStatus === 'Closing' && styles.selectedFilter]}
                onPress={() => setSelectedStatus(selectedStatus === 'Closing' ? null : 'Closing')}
              >
                <StatusCard
                  title="Closing"
                  count={globalProjectStats.closing}
                  color={getStatusCardColor('Closing')}
                  textColor={getStatusTextColor('Closing')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterCard, selectedStatus === 'Closed' && styles.selectedFilter]}
                onPress={() => setSelectedStatus(selectedStatus === 'Closed' ? null : 'Closed')}
              >
                <StatusCard
                  title="Closed"
                  count={globalProjectStats.closed}
                  color={getStatusCardColor('Closed')}
                  textColor={getStatusTextColor('Closed')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Projects List */}
        <View style={styles.projectsSection}>
          <View style={styles.projectsHeader}>
            <Text style={styles.projectsTitle}>
              {selectedStatus ? `${selectedStatus} Projects` : 'All Projects'}
            </Text>
            <Text style={styles.projectsCount}>
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                status={project.status}
                afe={project.afe}
                completion={project.completion}
                onPress={() => handleProjectPress(project.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="folder-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No projects found</Text>
              <Text style={styles.emptySubtext}>
                {selectedStatus ? `No projects with status "${selectedStatus}"` : 'No projects available'}
              </Text>
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
  filterSection: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statusGrid: {
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterCard: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedFilter: {
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  projectsSection: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
    minHeight: 400,
  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  projectsCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
});
