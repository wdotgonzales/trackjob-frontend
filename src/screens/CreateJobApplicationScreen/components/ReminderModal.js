import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ReminderModal = ({
  visible,
  onCancel,
  onSave,
  initialDate = new Date(),
  initialTime = new Date(),
  backgroundColor = "#1a5a66",
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSave = () => {
    // Combine selected date and time into a single Date object
    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(selectedTime.getHours());
    combinedDateTime.setMinutes(selectedTime.getMinutes());
    combinedDateTime.setSeconds(0);
    combinedDateTime.setMilliseconds(0);

    // Get current date and time
    const now = new Date();

    // Check if selected date/time is in the past
    if (combinedDateTime <= now) {
      // You can show an alert or handle this however you prefer
      alert('Please select a future date and time for the reminder.');
      return;
    }

    // If validation passes, proceed with save
    onSave && onSave({
      date: selectedDate,
      time: selectedTime,
    });
  };

  const handleCancel = () => {
    // Reset to initial values when canceling
    setSelectedDate(initialDate);
    setSelectedTime(initialTime);
    onCancel && onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: '#052731' }]}>
          <View style={styles.header}>
            <Text style={styles.questionMark}>?</Text>
            <Text style={styles.title}>When to remind?</Text>
          </View>

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={showDatePicker}
            activeOpacity={0.7}
          >
            <Text style={styles.pickerText}>{formatDate(selectedDate)}</Text>
            <Ionicons name="calendar-outline" size={20} color="white" />
          </TouchableOpacity>

          {/* Time Picker */}
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={showTimePicker}
            activeOpacity={0.7}
          >
            <Text style={styles.pickerText}>{formatTime(selectedTime)}</Text>
            <Ionicons name="time-outline" size={20} color="white" />
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Date Time Pickers */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={selectedDate}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
        date={selectedTime}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 49, 49, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionMark: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  pickerButton: {
    backgroundColor: '#054B63',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ReminderModal;