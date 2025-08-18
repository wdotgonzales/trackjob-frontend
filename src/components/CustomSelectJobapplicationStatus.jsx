import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import all images at the top
import logo2 from "../../assets/job_application_status_logos/job-app-status-logo-2.png";
import logo3 from "../../assets/job_application_status_logos/job-app-status-logo-3.png";
import logo4 from "../../assets/job_application_status_logos/job-app-status-logo-4.png";
import logo5 from "../../assets/job_application_status_logos/job-app-status-logo-5.png";
import logo6 from "../../assets/job_application_status_logos/job-app-status-logo-6.png";
import logo7 from "../../assets/job_application_status_logos/job-app-status-logo-7.png";
import logo8 from "../../assets/job_application_status_logos/job-app-status-logo-8.png";
import logo9 from "../../assets/job_application_status_logos/job-app-status-logo-9.png";

// Create image map
const logoMap = {
  2: logo2,
  3: logo3,
  4: logo4,
  5: logo5,
  6: logo6,
  7: logo7,
  8: logo8,
  9: logo9,
};

export const jobApplicationStatusIconData = [
  {
    id: 1,
    label: "Applied",
    description: "You submitted your application.",
    logoUrl: logoMap[2],
    textColor: "white",
    backgroundColor: "#0055FF",
    isActive: false,
  },
  {
    id: 6,
    label: "Rejected",
    description: "You were not selected for the position.",
    logoUrl: logoMap[3],
    textColor: "white",
    backgroundColor: "#FF0000",
    isActive: false,
  },
  {
    id: 7,
    label: "Ghosted",
    description: "No response from the employer after follow-ups.",
    logoUrl: logoMap[4],
    textColor: "white",
    backgroundColor: "#262626",
    isActive: false,
  },
  {
    id: 2,
    label: "Under Review",
    description: "Your application is being evaluated.",
    logoUrl: logoMap[5],
    textColor: "black",
    backgroundColor: "#FFC107",
    isActive: false,
  },
  {
    id: 4,
    label: "Offer Received",
    description: "You received a job offer.",
    logoUrl: logoMap[6],
    textColor: "white",
    backgroundColor: "#388E3C",
    isActive: false,
  },
  {
    id: 3,
    label: "Interview Scheduled",
    description: "An interview has been scheduled.",
    logoUrl: logoMap[7],
    textColor: "black",
    backgroundColor: "#FB8C00",
    isActive: false,
  },
  {
    id: 8,
    label: "Withdrawn/Closed",
    description: "You withdrew or the company closed the job opening.",
    logoUrl: logoMap[8],
    textColor: "black",
    backgroundColor: "#9E9E9E",
    isActive: false,
  },
  {
    id: 5,
    label: "Accepted Offer",
    description: "You accepted a job offer.",
    logoUrl: logoMap[9],
    textColor: "white",
    backgroundColor: "#21C400",
    isActive: false,
  },
];

const { width, height } = Dimensions.get("window");

const CustomSelectJobApplicationStatus = ({
  visible,
  onClose,
  selectedStatusId = null,
  handleSelectJobApplicationStatus,
  setSelectedJobApplicationStatusId,
  isButtonHidden = false,
}) => {
  const [tempSelectedId, setTempSelectedId] = useState(selectedStatusId);
  const [statusData, setStatusData] = useState(jobApplicationStatusIconData);

  useEffect(() => {
    if(tempSelectedId){
        setSelectedJobApplicationStatusId(tempSelectedId);
    }
  }, [tempSelectedId, setTempSelectedId])

  const handleSelectStatus = (status) => {
    setTempSelectedId(status.id);
    setSelectedJobApplicationStatusId(status.id);
  };

  const handleSetStatus = () => {
    handleSelectJobApplicationStatus();
  };

  const renderStatusItem = ({ item }) => {
    const isSelected = tempSelectedId === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.statusItem,
          { backgroundColor: item.backgroundColor },
          isSelected && styles.selectedItem,
          item.isActive && styles.activeItem,
        ]}
        onPress={() => handleSelectStatus(item)}
        activeOpacity={0.8}
      >
        <View style={styles.statusContent}>
          <Image source={item.logoUrl} style={styles.statusIcon} />
          <View style={styles.statusText}>
            <Text style={[styles.statusLabel, { color: item.textColor }]}>
              {item.label}
            </Text>
            <Text style={[styles.statusDescription, { color: item.textColor }]}>
              {item.description}
            </Text>
          </View>
        </View>
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={20} color={item.textColor} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Set Job Application Status</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#FF0000" />
            </TouchableOpacity>
          </View>

          {/* Status List */}
          <FlatList
            data={statusData}
            renderItem={renderStatusItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.statusList}
            showsVerticalScrollIndicator={false}
          />

          {/* Set Button */}
          {
            !isButtonHidden && (
              <TouchableOpacity
                style={[
                  styles.setButton,
                  !tempSelectedId && styles.setButtonDisabled,
                ]}
                onPress={handleSetStatus}
                disabled={!tempSelectedId}
                activeOpacity={0.8}
              >
                <Text style={styles.setButtonText}>Set</Text>
            </TouchableOpacity>
            )
          }
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: "#1E3A4A",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  statusList: {
    maxHeight: height * 0.6,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minHeight: 60,
  },
  activeItem: {
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: "#ffffffff",
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
    resizeMode: "contain",
  },
  statusText: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  statusDescription: {
    fontSize: 12,
    opacity: 0.9,
  },
  checkmarkContainer: {
    marginLeft: 8,
  },
  setButton: {
    backgroundColor: "#0B4C63",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 4,
  },
  setButtonDisabled: {
    backgroundColor: "#0B4C63",
    opacity: 0.5,
  },
  setButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomSelectJobApplicationStatus;