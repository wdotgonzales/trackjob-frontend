import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReminderModal from './ReminderModal';
import { showToast } from '../../../components/CustomToaster';

const FullScreenModal = ({
  visible,
  onClose,
  onSave,
  title = "Add Details",
  titlePlaceholder = "Set Title",
  descriptionPlaceholder = "Set Description",
  initialTitle = "",
  initialDescription = "",
  initialDate = new Date(),
  initialTime = new Date(),
  backgroundColor = "#1a5a66",
}) => {
  const [titleText, setTitleText] = useState(initialTitle);
  const [descriptionText, setDescriptionText] = useState(initialDescription);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleCheckPress = () => {
    if (!titleText || !descriptionText){
        Alert.alert('Fields Required!', 'Title and description fields are required!')
        return;
    }
    // Show reminder modal when check icon is pressed
    setReminderModalVisible(true);
  };

  const handleReminderCancel = () => {
    // Only hide reminder modal, keep fullscreen modal open
    setReminderModalVisible(false);
  };

  const handleReminderSave = (reminderData) => {
    // Save reminder data and close both modals
    setSelectedDate(reminderData.date);
    setSelectedTime(reminderData.time);
    setReminderModalVisible(false);
    
    // Call the main save function with all data
    onSave && onSave({
      title: titleText,
      description: descriptionText,
      date: reminderData.date,
      time: reminderData.time,
    });
    
    // Close the fullscreen modal
    onClose && onClose();
  };

  const handleClose = () => {
    // Reset to initial values when closing
    setTitleText(initialTitle);
    setDescriptionText(initialDescription);
    setSelectedDate(initialDate);
    setSelectedTime(initialTime);
    setReminderModalVisible(false);
    onClose && onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent
      >
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
          <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>{title}</Text>
            
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleCheckPress}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <KeyboardAvoidingView
            style={styles.content}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Title Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={titlePlaceholder}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={titleText}
                  onChangeText={setTitleText}
                  multiline={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>

              {/* Description Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  placeholder={descriptionPlaceholder}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={descriptionText}
                  onChangeText={setDescriptionText}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={8}
                  returnKeyType="default"
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      {/* Reminder Modal */}
      <ReminderModal
        visible={reminderModalVisible}
        onCancel={handleReminderCancel}
        onSave={handleReminderSave}
        initialDate={selectedDate}
        initialTime={selectedTime}
        backgroundColor={backgroundColor}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    color: 'white',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '400',
  },
  descriptionInput: {
    minHeight: 120,
    maxHeight: 200,
    borderBottomWidth: 0,
    paddingTop: 12,
  },
});

export default FullScreenModal;