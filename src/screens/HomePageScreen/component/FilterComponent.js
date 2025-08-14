import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchJobApplication } from '../../../features/jobApplication/jobApplication';
import { jobApplicationStatusIconData } from "../data/contentData";
import JobApplicationIconComponent from '../../../components/JobApplicationIconComponent';
import { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDateToYYYYMMDD, formatDateToMonDDYYYY } from '../../../utils/utils';
import RadioButton from '../../../components/RadioButton';

// Constants for modal sizing
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const FILTER_HEIGHT = SCREEN_HEIGHT * 0.8 // Modal takes 80% of screen height

/**
 * FilterComponent - A modal component for filtering job applications
 * Provides filters for: application status, employment type, work arrangement, and application date
 * 
 * @param {boolean} visible - Controls modal visibility
 * @param {function} onClose - Callback function when modal is closed
 * @param {string} title - Modal title (defaults to "Filters")
 */
const FilterComponent = ({
  visible,
  onClose,
  title = "Filters",
  setSearchText,
  setIsSearched,
}) => {
  // Animation references for slide-up modal effect
  const slideAnim = useRef(new Animated.Value(FILTER_HEIGHT)).current; // Start hidden (off-screen)
  const backgroundOpacity = useRef(new Animated.Value(0)).current; // Start with transparent overlay

  // Redux hooks for state management
  const dispatch = useDispatch();
  const { currentParams: jobApplicationCurrentParams } = useSelector((state) => state.jobApplication);

  // Local state for filter selections
  const [jobApplicationStatusIconFilterData, setJobApplicationStatusIconFilterData] = useState(jobApplicationStatusIconData);
  const [selectedJobApplicationStatus, setSelectedJobApplicationStatus] = useState("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
  const [selectedWorkArrangement, setSelectedWorkArrangement] = useState('');
  
  // Date picker state
  const [dateExact, setDateExact] = useState(""); // Selected application date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Date picker modal visibility
  
  // Date picker handlers
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  /**
   * Handles date selection from date picker
   * @param {Date} date - Selected date object
   */
  const handleConfirm = (date) => {
    setDateExact(formatDateToYYYYMMDD(date));
    hideDatePicker();
  };

  /**
   * Clears the selected date filter
   */
  const clearDate = () => {
    setDateExact(""); // Reset to empty string
  };

  /**
   * Initialize filter values when modal opens
   * Syncs local state with current Redux params to show existing selections
   */
  useEffect(() => {
    if (visible) {
      // Extract current filter values from Redux state
      const currentStatus = jobApplicationCurrentParams.job_application_status || "";
      const currentEmploymentType = jobApplicationCurrentParams.employment_type || "";
      const currentWorkArrangement = jobApplicationCurrentParams.work_arrangement || "";
      const currentDateExact = jobApplicationCurrentParams.date_exact || "";
      
      // Update local state with current values
      setSelectedJobApplicationStatus(currentStatus);
      setSelectedEmploymentType(currentEmploymentType);
      setSelectedWorkArrangement(currentWorkArrangement);
      setDateExact(currentDateExact);

      // Update status icon data to reflect current selection
      const updatedData = jobApplicationStatusIconData.map(item => ({
        ...item,
        isActive: item.label === currentStatus || (currentStatus === "" && item.isDefault)
      }));
      
      setJobApplicationStatusIconFilterData(updatedData);
    }
  }, [visible, jobApplicationCurrentParams.job_application_status, jobApplicationCurrentParams.employment_type, jobApplicationCurrentParams.work_arrangement, jobApplicationCurrentParams.date_exact]);

  /**
   * Handle modal animations based on visibility
   * Slide up from bottom when opening, slide down when closing
   */
  useEffect(() => {
    if (visible) {
      // Animate in - slide up from bottom with background overlay
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Final position (fully visible)
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0.5, // Semi-transparent background
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out - slide down to bottom
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: FILTER_HEIGHT, // Back to hidden position (off-screen)
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0, // Transparent background
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  /**
   * Handle modal close with animation
   * Animates out first, then calls onClose callback
   */
  const handleClose = () => {
    // First animate out, then call onClose after animation completes
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: FILTER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // This callback runs after animation completes
      onClose();
    });
  };

  /**
   * Handle job application status selection
   * Updates both visual state and selection state
   * @param {Object} selectedItem - Selected status item from the icon data
   */
  const handleStatusSelection = (selectedItem) => {
    // Update local state for immediate visual feedback
    setSelectedJobApplicationStatus(selectedItem.label);
    
    // Update the filter data to reflect new selection (for visual active state)
    const updatedData = jobApplicationStatusIconFilterData.map(item => ({
      ...item,
      isActive: item.id === selectedItem.id
    }));
    
    setJobApplicationStatusIconFilterData(updatedData);
  };

  /**
   * Handle employment type radio button selection
   * @param {string} type - Selected employment type
   */
  const handleEmploymentTypeSelect = (type) => {
    setSelectedEmploymentType(type);
  };

  /**
   * Handle work arrangement radio button selection
   * @param {string} type - Selected work arrangement type
   */
  const handleWorkArrangementTypeSelect = (type) => {
    setSelectedWorkArrangement(type)
  }

  /**
   * Apply filters and close modal
   * Animates out first, then dispatches Redux action with new filter parameters
   */
  const handleCheck = () => {
    // First animate out, then call onClose after animation completes
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: FILTER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update Redux with selected filters after animation
      updateFilters({ 
        page: 1, // Reset to first page when applying new filters
        job_application_status: selectedJobApplicationStatus,
        employment_type: selectedEmploymentType,
        work_arrangement: selectedWorkArrangement,
        date_exact: dateExact,
        company_name: "",
        position_title: "", 
      });
      setSearchText('');
      onClose();
    });    
  };

  /**
   * Update Redux state with new filter parameters
   * Merges new params with existing params and triggers data fetch
   * @param {Object} newParams - New filter parameters to apply
   */
  const updateFilters = (newParams) => {
      const mergedParams = { ...jobApplicationCurrentParams, ...newParams };
      dispatch(fetchJobApplication(mergedParams));
      setIsSearched(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none" // Using custom animations instead
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {/* Background overlay - tapping this closes the modal */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View 
            style={[
              styles.backgroundOverlay,
              {
                opacity: backgroundOpacity,
              }
            ]} 
          />
        </TouchableWithoutFeedback>

        {/* Main filter panel */}
        <Animated.View
          style={[
            styles.filterContainer,
            {
              transform: [{ translateY: slideAnim }], // Slide animation
            },
          ]}
        >
          {/* Header with back button, title, and check button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleCheck} style={styles.checkButton}>
              <Ionicons name="checkmark" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Scrollable content area */}
          <ScrollView style={styles.content}>

            {/* Application Status Filter Section */}
            <Text style={styles.label}>Application Status:</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Render status icons with selection handling */}
              {
                jobApplicationStatusIconFilterData.map((item, index) => (
                  <View key={index} style={styles.iconContainer}>
                    <JobApplicationIconComponent 
                      iconPath={item.logoUrl} 
                      iconWidth={item.iconWidth}
                      iconHeight={item.iconHeight}
                      backgroundColor={item.bacgroundColor}
                      textColor={item.color}
                      text={item.shortenLabel}
                      isActive={item.isActive}
                      textMarginTop={item.textMarginTop}
                      onPress={() => handleStatusSelection(item)}
                    />
                  </View>
                ))
              }
            </ScrollView>

            {/* Employment Type Filter Section */}
            <Text style={[styles.label, {marginTop: 24}]}>Employment Type:</Text>
            <View style={styles.employmentOptionsContainer}>
              {/* Row 1: All and Full-time */}
              <View style={styles.row}>
                <RadioButton
                  isSelected={selectedEmploymentType === ''}
                  onPress={() => handleEmploymentTypeSelect('')}
                  label="All"
                />
                <RadioButton
                  isSelected={selectedEmploymentType === 'Full-time'}
                  onPress={() => handleEmploymentTypeSelect('Full-time')}
                  label="Full-time"
                />
              </View>
              
              {/* Row 2: Part-time and Contract */}
              <View style={styles.row}>
                <RadioButton
                  isSelected={selectedEmploymentType === 'Part-time'}
                  onPress={() => handleEmploymentTypeSelect('Part-time')}
                  label="Part-time"
                />
                <RadioButton
                  isSelected={selectedEmploymentType === 'Contract'}
                  onPress={() => handleEmploymentTypeSelect('Contract')}
                  label="Contract"
                />
              </View>

              {/* Row 3: Internship and Temporary */}
              <View style={styles.row}>
                <RadioButton
                  isSelected={selectedEmploymentType === 'Internship'}
                  onPress={() => handleEmploymentTypeSelect('Internship')}
                  label="Internship"
                />
                <RadioButton
                  isSelected={selectedEmploymentType === 'Temporary'}
                  onPress={() => handleEmploymentTypeSelect('Temporary')}
                  label="Temporary"
                />
              </View>

              {/* Row 4: Freelance (single option) */}
              <View style={styles.row}>
                <RadioButton
                  isSelected={selectedEmploymentType === 'Freelance'}
                  onPress={() => handleEmploymentTypeSelect('Freelance')}
                  label="Freelance"
                />
              </View>
            </View>

            {/* Work Arrangement Filter Section */}
            <Text style={[styles.label, {marginTop: 24}]}>Work Arrangement:</Text>
            <View style={styles.workArrangementOptionsContainer}>
              {/* Row 1: All, On-site, and Remote */}
              <View style={styles.row}>
                <RadioButton
                  isSelected={selectedWorkArrangement === ''}
                  onPress={() => handleWorkArrangementTypeSelect('')}
                  label="All"
                />
                <RadioButton
                  isSelected={selectedWorkArrangement === 'On-site'}
                  onPress={() => handleWorkArrangementTypeSelect('On-site')}
                  label="On-site"
                />
                <RadioButton
                  isSelected={selectedWorkArrangement === 'Remote'}
                  onPress={() => handleWorkArrangementTypeSelect('Remote')}
                  label="Remote"
                />
              </View>
              
              {/* Row 2: Hybrid (single option) */}
              <View style={styles.row}>
                <RadioButton
                  isSelected={selectedWorkArrangement === 'Hybrid'}
                  onPress={() => handleWorkArrangementTypeSelect('Hybrid')}
                  label="Hybrid"
                />
              </View>
            </View>

            {/* Date Filter Section */}
            <View style={styles.dateSection}>
              <View style={styles.dateHeader}>
                {/* Date information display */}
                <View style={styles.dateInfo}>
                  <Text style={[styles.label, {marginTop: 10, marginBottom: 5}]}>
                    Set Date: <Text style={{fontWeight: "bold", color: dateExact ? "#ff6b35" : "transparent"}}>{formatDateToMonDDYYYY(dateExact) || 'Not set'}</Text>
                  </Text>
                  <Text style={styles.dateSubtitle}>* Date you applied for job</Text>
                </View>
                
                {/* Date action buttons */}
                <View style={styles.dateActions}>
                  {/* Calendar icon to open date picker */}
                  <Pressable onPress={showDatePicker} style={styles.dateButton}>
                    <Ionicons name="calendar" size={28} color="#ff6b35" />
                  </Pressable>
                  {/* Clear date button (only shown when date is selected) */}
                  {dateExact && (
                    <Pressable onPress={clearDate} style={[styles.dateButton, {marginLeft: 12}]}>
                      <Ionicons name="close-circle" size={28} color="#ff6b35" />
                    </Pressable>
                  )}
                </View>
              </View>
            </View>

          </ScrollView>

        </Animated.View>
      </View>

      {/* Date picker modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </Modal>
    
  );
};

// Stylesheet definitions
const styles = StyleSheet.create({
  // Main overlay container
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Position modal at bottom
  },
  // Semi-transparent background overlay
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  // Main filter container with rounded top corners
  filterContainer: {
    height: FILTER_HEIGHT,
    backgroundColor: '#1a3a52',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  // Header section with navigation buttons
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  // Back button styling
  backButton: {
    padding: 4,
  },
  // Check/apply button styling
  checkButton: {
    padding: 4,
  },
  // Header title styling
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  // Main content area with padding
  content: {
    margin: 15,
  },
  // Horizontal scroll content spacing
  scrollContent: {
    gap: 8, // Space between status icons
  },
  // Individual icon container
  iconContainer: {
    // Additional styling for each icon container if needed
  },
  // Generic filter section spacing
  filterSection: {
    marginVertical: 16,
  },
  // Section title styling
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  // Individual filter option styling
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
  },
  // Selected filter option styling
  selectedOption: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  // Filter option icon spacing
  optionIcon: {
    marginRight: 12,
  },
  // Filter option text styling
  optionText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
  },
  // Selected filter option text styling
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  // Section label styling
  label: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  // Employment type options container
  employmentOptionsContainer: {
    gap: 16, // Space between rows
  },
  // Work arrangement options container
  workArrangementOptionsContainer: {
    gap: 16, // Space between rows
  },
  // Row layout for radio buttons
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Individual radio button container
  radioContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  // Radio button layout
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Radio button outer circle
  radioButtonOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4a6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  // Selected radio button outer circle
  radioButtonSelected: {
    borderColor: '#ff6b35',
  },
  // Radio button inner filled circle
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff6b35',
  },
  // Radio button label text
  radioLabel: {
    color: '#b0c4c4',
    fontSize: 16,
    flex: 1,
  },
  // Selected radio button label text
  radioLabelSelected: {
    color: '#ffffff',
  },
  // Date filter section container
  dateSection: {
    marginTop: 24,
  },
  // Date header layout
  dateHeader: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  // Date information area
  dateInfo: {
    flex: 1,
  },
  // Date action buttons container
  dateActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Individual date button styling
  dateButton: {
    padding: 4,
  },
  // Date subtitle/helper text
  dateSubtitle: {
    color: "#ff6b35",
    fontSize: 12,
    marginBottom: 16,
    marginTop: -5,
  },
});

export default FilterComponent;