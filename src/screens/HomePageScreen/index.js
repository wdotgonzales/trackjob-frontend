import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  RefreshControl 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { fetchUserProfile } from "../../features/profile/profileSlice";
import { fetchJobApplication } from "../../features/jobApplication/listJobApplicationSlice";
import useTimeGreeting from "../../hooks/useTimeGreeting";
import CustomLoader from "../../components/CustomLoader";
import FilterComponent from "./component/FilterComponent";
import JobApplicationCard from "../../components/JobApplicationCard";
import CustomModal from "../../components/CustomModal";
import { httpClient } from "../../services/httpClient";
import { showToast } from "../../components/CustomToaster";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const DEFAULT_FILTERS = {
  page: 1,
  employment_type: "",
  job_application_status: "",
  work_arrangement: "",
  company_name: "",
  position_title: "",
  date_exact: "",
};

const HomePageScreen = () => {
  const dispatch = useDispatch();
  const { greeting } = useTimeGreeting();
  const navigation = useNavigation();

  // Redux state
  const { 
    data: dataProfile, 
    isLoading: isProfileDataLoading 
  } = useSelector((state) => state.profile);
  
  const { 
    data: dataJobApplication, 
    isLoading: isJobApplicationLoading, 
    currentParams: jobApplicationCurrentParams 
  } = useSelector((state) => state.jobApplication);

  // Local state
  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [isFilterComponentVisible, setIsFilterComponentVisible] = useState(false);
  const [jobApplication, setJobApplication] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentFilters, setCurrentFilters] = useState(DEFAULT_FILTERS);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserProfile());
      setDefaultFilter();
    }, [])
  );
  
  useEffect(() => {
    if (jobApplicationCurrentParams) {
      setCurrentFilters(jobApplicationCurrentParams);
    }
  }, [jobApplicationCurrentParams]);
  
  useEffect(() => {
    const newData = dataJobApplication?.results || [];
    const newCurrentPage = dataJobApplication?.current_page || 1;
    const newTotalPages = dataJobApplication?.total_pages || 1;
    
    if (newCurrentPage === 1) {
      setJobApplication(newData);
    } else {
      setJobApplication(prevJobs => [...prevJobs, ...newData]);
    }
    
    setCurrentPage(newCurrentPage);
    setHasMoreData(newCurrentPage < newTotalPages);
    setIsLoadingMore(false);
  }, [dataJobApplication, isJobApplicationLoading]);

  // Helper functions
  const setDefaultFilter = () => {
    setCurrentFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    setHasMoreData(true);
    dispatch(fetchJobApplication(DEFAULT_FILTERS));
  };

  const updateFilters = (newParams) => {
    const mergedParams = { 
      ...currentFilters, 
      ...newParams, 
      page: 1 
    };
    
    setCurrentFilters(mergedParams);
    setCurrentPage(1);
    setHasMoreData(true);
    dispatch(fetchJobApplication(mergedParams));
  };

  // Event handlers
  const handleAddNewJob = () => {
    navigation.navigate('CreateJobApplication');
    console.log("jews did 9/11")
  };

  const handleClearHistory = () => {
    setShowModal(true);
  };

  const handleFilter = () => {
    setIsFilterComponentVisible(true);
  };

  const handleSearchSubmit = () => {
    updateFilters({ position_title: searchText });
    if (searchText) {
      setIsSearched(true);
      setLastSearchedTerm(searchText);
    } else {
      setIsSearched(false);
    }
  };

  const handleCardPress = (item) => {
    navigation.navigate('SingleJobApplication', {
      job_application_id: item.id
    });
  };

  const handleDelete = async () => {
    try {
      const response = await httpClient.delete('job_application/delete-all/');
        
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      showToast('success', 'Success', 'Job Application are all deleted.');
      dispatch(fetchJobApplication(DEFAULT_FILTERS));

    } catch (error) {
      console.error('Delete error:', error);
      showToast('error', 'Error', 'Failed to delete all Job Applications.');
    } finally {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setSearchText('');
    setIsSearched(false);
    setLastSearchedTerm('');
    setDefaultFilter();
    setRefreshing(false);
  };

  const loadMoreData = () => {
    if (!isLoadingMore && hasMoreData && !isJobApplicationLoading) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      
      const loadMoreParams = {
        ...currentFilters,
        page: nextPage
      };
      
      dispatch(fetchJobApplication(loadMoreParams));
    }
  };

  // Helper functions for rendering
  const hasActiveFilters = () => {
    return currentFilters.employment_type !== '' 
        || currentFilters.job_application_status !== ''
        || currentFilters.work_arrangement !== ''
        || currentFilters.date_exact !== '';
  };

  const getTruncatedSearchTerm = (term) => {
    return term.length > 21 ? `${term.substring(0, 21)}...` : term;
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#F97009" />
        <Text style={styles.footerText}>Loading more jobs...</Text>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={{ color: "white", marginTop: 5 }}>No Job Found.</Text>
    </View>
  );

  const renderJobCard = ({ item }) => (
    <JobApplicationCard 
      jobTitle={item.position_title}
      companyName={item.company_name}
      jobLocation={item.job_location}
      jobApplicationStatus={item.job_application_status.label}
      workArrangement={item.work_arrangement.label}
      employmentType={item.employment_type.label}
      dateApplied={item.date_applied}
      createdAt={item.created_at}
      updatedAt={item.updated_at}
      onPress={() => handleCardPress(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image 
        source={
          dataProfile?.profile_url 
            ? { uri: dataProfile.profile_url }
            : require('../../../assets/default-avatar.png')
        }
        style={styles.profileAvatar}
      />
      <View>
        <Text style={styles.greetingText}>{greeting},</Text>
        <Text style={styles.nameText}>
          {dataProfile?.full_name || 'Guest User'}
        </Text>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity 
        style={styles.addJobButton}
        onPress={handleAddNewJob}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addJobText}>Add New Job</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.clearHistoryButton}
        onPress={handleClearHistory}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        <Text style={styles.clearHistoryText}>Clear History</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/trackjob-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  const renderSearchSection = () => (
    <>
      <Text style={styles.searchDescription}>
        Search for jobs you applied to.
      </Text>

      <View style={[styles.searchContainer, { marginBottom: isSearched ? 0 : 8 }]}>
        <View style={styles.searchInputContainer}>
          <Ionicons 
            name="search" 
            size={20} 
            color="#999" 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Job Title"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={handleFilter}
          activeOpacity={0.8}
        >
          <Ionicons 
            name="options" 
            size={25} 
            color={hasActiveFilters() ? '#F97009' : '#FFFFFF'} 
          />
        </TouchableOpacity>
      </View>

      {isSearched && (
        <View style={styles.searchResultContainer}>
          <Text style={styles.searchResultText}>
            Result for <Text style={styles.searchResultTerm}>
              {getTruncatedSearchTerm(lastSearchedTerm)}
            </Text>
          </Text>
        </View>
      )}

      <View style={styles.divider} />
    </>
  );

  const isLoading = isProfileDataLoading || (isJobApplicationLoading && currentPage === 1);

  return (
    <>
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.marginContainer}>
            {renderHeader()}
            {renderActionButtons()}
            {renderSearchSection()}
            
            <FlatList
              data={jobApplication}
              renderItem={renderJobCard}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#FFFFFF"
                  colors={["#F97009"]}
                  progressBackgroundColor="#FFFFFF"
                />
              }
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmptyComponent}
              contentContainerStyle={jobApplication.length === 0 ? styles.emptyContainer : null}
            />
          </View>
        </SafeAreaView>
      </View> 

      <FilterComponent
        visible={isFilterComponentVisible}
        onClose={() => setIsFilterComponentVisible(false)}
        title="Filters"
        setSearchText={setSearchText}
        setIsSearched={setIsSearched}
        onRefresh={onRefresh}
        updateFilters={updateFilters}
      />

      {isLoading && (
        <CustomLoader 
          size={60}
          color="#F97009"
          backgroundColor="rgba(255, 255, 255, 0.3)"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}

      <CustomModal
        visible={showModal}
        onClose={handleCancel}
        onConfirm={handleDelete}
        title="Are you sure?"
        message="This will delete all your history."
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#054B63"
  },
  marginContainer: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 20, 
  },
  headerContainer: {
    flexDirection: "row",
    gap: 10,
  },
  profileAvatar: {
    height: 55,
    width: 55,
    borderRadius: 34,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
    marginTop: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 15,
  },
  addJobButton: {
    backgroundColor: '#F97009',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 15,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addJobText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  clearHistoryButton: {
    backgroundColor: '#303030',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clearHistoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#054B63',
    borderRadius: 8,
    padding: 8,
  },
  searchDescription: {
    color: "white",
    marginTop: 15,
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  },
  filterButton: {
    backgroundColor: '#0891B2',
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultContainer: {
    marginTop: 15,
  },
  searchResultText: {
    color: "white",
    fontSize: 16,
  },
  searchResultTerm: {
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 8,
    marginTop: 6,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 14,
    opacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePageScreen;