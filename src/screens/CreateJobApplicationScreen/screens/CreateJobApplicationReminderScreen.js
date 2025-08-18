import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/CustomButton";

import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';

import FullScreenModal from "../components/FullScreenModal";

import { convertToPHISOString , formatISOToReadablePH } from "../../../utils/utils";

import CustomLoader from "../../../components/CustomLoader";

import { httpClient } from "../../../services/httpClient";

const CreateJobApplicationReminderScreen = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSaveData = (data) => {
        const formattedDate = data.date.toLocaleDateString();
        const formattedTime = data.time.toLocaleTimeString('en-PH', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const newReminder = {
            temporary_id: Date.now(),
            title: data.title,
            description: data.description,
            is_enabled: true,
            reminder_datetime: convertToPHISOString(formattedDate, formattedTime) 
        };

        setReminders((prevReminders) => [...prevReminders, newReminder]);
    };

    const handleDeleteReminder = (reminderId) => {
        Alert.alert(
            "Delete Reminder",
            "Are you sure you want to delete this reminder?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setReminders((prevReminders) => 
                            prevReminders.filter(reminder => reminder.temporary_id !== reminderId)
                        );
                    }
                }
            ]
        );
    };

    const handleProceed = async () => {
        const { data:jobApplicationData } = route.params;

        // Remove temporary_id from all reminders
        const remindersWithoutTempId = reminders.map(reminder => {
            const { temporary_id, ...reminderWithoutTempId } = reminder;
            return reminderWithoutTempId;
        });

        await createJobApplication(jobApplicationData, remindersWithoutTempId)
    };

    const createJobApplication = async (jobApplicationData, remindersWithoutTempId) => {
        setIsLoading(true);
        try {
            const response = await httpClient.post('job_application/', jobApplicationData);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const { id:job_application_id } = result.data;
            
            if (remindersWithoutTempId.length == 0){
                setIsLoading(false);
                navigation.replace("CreateJobApplicationSuccessScreen");
                return;
            }

            createReminder(job_application_id, remindersWithoutTempId)

        } catch (error) {
            console.log(error);
            showToast('error', 'Error', 'Contact Administrator.');
            setIsLoading(false);
        }
    }

    const createReminder = async (job_application_id, remindersWithoutTempId) => {
        try {
            const response = await httpClient.post(`job_application/${job_application_id}/reminder/bulk-create/`, remindersWithoutTempId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            navigation.replace("CreateJobApplicationSuccessScreen");
        } catch (error) {
            console.log(error);
            showToast('error', 'Error', 'Fail to create reminders, contact administrator.');
            navigation.replace("MainTabs", { screen: "Home" });
        } finally {
            setIsLoading(false);
        }
    }

    const renderReminderCard = (reminder) => {
        const formattedDateTime = formatISOToReadablePH(reminder.reminder_datetime);
        
        return (
            <View key={reminder.temporary_id} style={styles.reminderCard}>
                <View style={styles.reminderContent}>
                    <Text style={styles.reminderTitle}>{reminder.title}</Text>
                    <Text style={styles.reminderDescription}>{reminder.description}</Text>
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateTimeText}>{formattedDateTime}</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteReminder(reminder.temporary_id)}
                >
                    <Ionicons name="close" size={20} color="#ff4444" />
                </TouchableOpacity>
            </View>
        );
    };

    return <>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Ionicons name="bulb-sharp" size={24} color="#F97009" />
                        <Text style={styles.headerTitle}>Add Reminders</Text>
                    </View>
            </View>
            
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.description}>
                        {reminders.length === 0 
                            ? "Add reminders for this specific job application to notify you about important updates, such as follow-ups, interviews, or deadlines."
                            : "Enter the location of the job you applied for. This helps keep track of where each opportunity is based."
                        }
                    </Text>
                    
                    <View style={styles.addReminderContainer}>
                        <TouchableOpacity onPress={handleOpenModal}>
                            <AntDesign name="pluscircle" size={50} color="#F97009" />
                        </TouchableOpacity>
                        <Text style={styles.addReminderText}>Add Reminders</Text>
                    </View>

                    {/* Reminders List */}
                    {reminders.length > 0 && (
                        <View style={styles.remindersListContainer}>
                            {reminders.map(renderReminderCard)}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Proceed Button - Fixed at bottom */}
            <View style={styles.proceedContainer}>
                <CustomButton 
                    title="Proceed" 
                    style={styles.proceedButton} 
                    textStyle={styles.proceedButtonText} 
                    onPress={handleProceed} 
                />
            </View>
        </SafeAreaView>

        <FullScreenModal
            key={modalVisible ? 'open' : 'closed'} // Force remount when modal opens
            visible={modalVisible}
            onClose={handleCloseModal}
            onSave={handleSaveData}
            title="Add Details"
            titlePlaceholder="Set Title"
            descriptionPlaceholder="Set Description"
            initialTitle="" // Always start empty
            initialDescription="" // Always start empty
            initialDate={new Date()} // Always start with current date
            initialTime={new Date()} // Always start with current time
            backgroundColor="#054B63"
        />

        {
            isLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                />
            )
        }

    </>
}

export default CreateJobApplicationReminderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054B63"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: '#052731',
    },
    backButton: {
        marginRight: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 12,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Space for fixed button
    },
    bodyContainer: {
        marginTop: 15,
        marginHorizontal: 20,
    },
    description: {
        color: "white",
        fontSize: 15,
        lineHeight: 22,
    },
    addReminderContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        marginTop: 20,
        marginBottom: 20,
    },
    addReminderText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    remindersListContainer: {
        gap: 15,
    },
    reminderCard: {
        backgroundColor: '#052731',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    reminderContent: {
        flex: 1,
        marginRight: 12,
    },
    reminderTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    reminderDescription: {
        color: '#b0c4de',
        fontSize: 14,
        marginBottom: 8,
        lineHeight: 18,
    },
    dateTimeContainer: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: "white",
        marginTop: 7,
    },
    dateTimeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    deleteButton: {
        padding: 4,
    },
    proceedContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#054B63',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 40, // Extra padding for safe area
    },
    proceedButton: {
        backgroundColor: '#052731',
        borderRadius: 8,
        paddingVertical: 16,
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});