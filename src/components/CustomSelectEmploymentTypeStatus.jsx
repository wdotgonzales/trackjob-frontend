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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";


export const employmentTypeStatusIconData = [
  {
    id: 1,
    label: "Full-time",
    description: "Permanent, full-time work",
    logo: <AntDesign name="clockcircle" size={28} color="white" />,
    textColor: "white",
    backgroundColor: "#1B263B",
    isActive: false,
  },
  {
    id: 2,
    label: "Part-time",
    description: "Fewer hours than full-time",
    logo: <FontAwesome6 name="clock-rotate-left" size={28} color="white" />,
    textColor: "white",
    backgroundColor: "#0D6EFD",
    isActive: false,
  },
  {
    id: 3,
    label: "Contract",
    description: "Fixed-term contractual employment",
    logo: <FontAwesome5 name="file-contract" size={28} color="white" />,
    textColor: "white",
    backgroundColor: "#FF6B6B",
    isActive: false,
  },
  {
    id: 4,
    label: "Internship",
    description: "Internship or student position",
    logo: <AntDesign name="team" size={28} color="white" />,
    textColor: "white",
    backgroundColor: "#FFD93D",
    isActive: false,
  },
  {
    id: 5,
    label: "Temporary",
    description: "Short-term temporary work",
    logo: <MaterialCommunityIcons name="folder-clock" size={28} color="white" />,
    textColor: "white",
    backgroundColor: "#6BCB77",
    isActive: false,
  },
  {
    id: 6,
    label: "Freelance",
    description: "Project-based freelance job",
    logo: <MaterialCommunityIcons name="briefcase-clock" size={28} color="white" />,
    textColor: "white",
    backgroundColor: "#A66DD4",
    isActive: false,
  },
];

const { width, height } = Dimensions.get("window");

const CustomSelectEmploymentTypeStatus = ({
  visible,
  onClose,
  selectedStatusId = null,
  handleSelectEmploymentType,
  setSelectedEmploymentTypeId,
  isButtonHidden = false,
}) => {
  const [tempSelectedId, setTempSelectedId] = useState(selectedStatusId);
  const [statusData, setStatusData] = useState(employmentTypeStatusIconData);

  useEffect(() => {
    if(tempSelectedId){
        setSelectedEmploymentTypeId(tempSelectedId);
    }
  }, [tempSelectedId, setTempSelectedId])

  const handleSelectStatus = (status) => {
    setTempSelectedId(status.id);
    setSelectedEmploymentTypeId(status.id);
  };

  const handleSetStatus = () => {
    handleSelectEmploymentType();
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
          {/* <Image source={item.logo} style={styles.statusIcon} /> */}
          <View style={styles.statusIcon}>
            {item.logo}
          </View>
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
            <Text style={styles.headerTitle}>Set Work Arrangement Status</Text>
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

export default CustomSelectEmploymentTypeStatus;