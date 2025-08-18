import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import CustomSelectJobApplicationStatus from '../../components/CustomSelectJobapplicationStatus';
import CustomSelectWorkArrangementStatus from '../../components/CustomSelectWorkArrangementStatus';
import CustomSelectEmploymentTypeStatus from '../../components/CustomSelectEmploymentTypeStatus';

import { 
    ReturnJobApplicationStatusTextValueById, 
    ReturnEmploymentTypeValueById, 
    ReturnWorkArrangementValueById 
} from './utils/utils';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDateToYYYYMMDD, formatDateToMonDDYYYY } from '../../utils/utils';

import { showToast } from '../../components/CustomToaster';

const CreateJobApplicationScreen = ({ navigation, route }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [formData, setFormData] = useState({
        position_title: "",
        company_name: "",
        employment_type: null,
        work_arrangement: null,
        job_application_status: null,
        job_posting_link: "",
        date_applied: "",
        job_location: "",
        job_description: ""
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const CustomDropdown = ({ placeholder, value, onPress, icon }) => (
        <TouchableOpacity style={styles.dropdown} onPress={onPress}>
            <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
                {value || placeholder}
            </Text>
            {icon ? (
                <Ionicons name={icon} size={20} color="#FF6B35" />
            ) : (
                <Ionicons name="chevron-down" size={20} color="#A0A0A0" />
            )}
        </TouchableOpacity>
    );

    const [showJobApplicationStatusModal, setShowJobApplicationStatusModal] = useState(false);
    const setSelectedJobApplicationStatusId = (job_application_id) => {
        setFormData(prev => ({
            ...prev,
            job_application_status: job_application_id
        }));
    };

    const [showEmploymentTypeModal, setShowEmploymentTypeModal] = useState(false);
    const setSelectedEmploymentTypeId = (employment_type_id) => {
        setFormData(prev => ({
            ...prev,
            employment_type: employment_type_id
        }));
    };

    const [showWorkArrangementModal, setShowWorkArrangementModal] = useState(false);
    const setSelectedWorkArrangementId = (work_arrangement_id) => {
        setFormData(prev => ({
            ...prev,
            work_arrangement: work_arrangement_id
        }));
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const handleConfirm = (date) => {
        setFormData(prev => ({
            ...prev,
            date_applied: formatDateToYYYYMMDD(date)
        }))
        setDatePickerVisibility(false);
    }

    const validateForm = () => {
        const {
            company_name,
            date_applied,
            employment_type,
            job_application_status,
            job_description,
            job_location,
            job_posting_link,
            position_title,
            work_arrangement
        } = formData;

        if (!company_name || !date_applied || !employment_type || !job_application_status || !job_description || !job_location || !job_posting_link || !position_title || !work_arrangement) {
            showToast('error', 'Error!', 'Please enter the following required fields');
            return false;
        }

        // Check if job_posting_link starts with http or https
        const urlPattern = /^(https?:\/\/)/i;
        if (!urlPattern.test(job_posting_link)) {
            showToast('error', 'Invalid Link!', 'Job posting link must start with http:// or https://');
            return false;
        }

        return true;
    }

    const handleProceed = () => {

        if (!validateForm()) return;
        
        navigation.navigate("CreateJobApplicationReminder", { data: formData });
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Ionicons name="briefcase" size={24} color="#FF6B35" />
                        <Text style={styles.headerTitle}>Add New Job Application</Text>
                    </View>
                </View>

                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>Enter details for your new job application.</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Company Name:</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedInput === 'company_name' && styles.focusedInput
                            ]}
                            placeholder="e.g. ABC Company"
                            placeholderTextColor="#A0A0A0"
                            value={formData.company_name}
                            onChangeText={(value) => handleInputChange('company_name', value)}
                            onFocus={() => setFocusedInput('company_name')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Position Title:</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedInput === 'position_title' && styles.focusedInput
                            ]}
                            placeholder="e.g. Front End Developer"
                            placeholderTextColor="#A0A0A0"
                            value={formData.position_title}
                            onChangeText={(value) => handleInputChange('position_title', value)}
                            onFocus={() => setFocusedInput('position_title')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Job Location:</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedInput === 'job_location' && styles.focusedInput
                            ]}
                            placeholder="e.g. Manila, Philippines"
                            placeholderTextColor="#A0A0A0"
                            value={formData.job_location}
                            onChangeText={(value) => handleInputChange('job_location', value)}
                            onFocus={() => setFocusedInput('job_location')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Employment Type:</Text>
                        <CustomDropdown
                            placeholder="Select Employment Type"
                            value={ReturnEmploymentTypeValueById(formData.employment_type)}
                            onPress={() => setShowEmploymentTypeModal(true)}
                            icon="eye-outline"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Work Arrangement:</Text>
                        <CustomDropdown
                            placeholder="Select Work Arrangement"
                            value={ReturnWorkArrangementValueById(formData.work_arrangement)}
                            onPress={() => setShowWorkArrangementModal(true)}
                            icon="eye-outline"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Job Posting Link:</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedInput === 'job_posting_link' && styles.focusedInput
                            ]}
                            placeholder="e.g. https://ph.indeed.com/exact"
                            placeholderTextColor="#A0A0A0"
                            value={formData.job_posting_link}
                            onChangeText={(value) => handleInputChange('job_posting_link', value)}
                            onFocus={() => setFocusedInput('job_posting_link')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Job Description:</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                styles.textArea,
                                focusedInput === 'job_description' && styles.focusedInput
                            ]}
                            placeholder="Enter job description, requirements, and responsibilities..."
                            placeholderTextColor="#A0A0A0"
                            value={formData.job_description}
                            onChangeText={(value) => handleInputChange('job_description', value)}
                            onFocus={() => setFocusedInput('job_description')}
                            onBlur={() => setFocusedInput(null)}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date Applied:</Text>
                        <TouchableOpacity style={styles.dateInput} onPress={() => setDatePickerVisibility(true)}>
                            <Text style={[styles.dateText, !formData.date_applied && styles.placeholderText]}>
                                {formatDateToMonDDYYYY(formData.date_applied) || 'mm/dd/yyyy'}
                            </Text>
                            <Ionicons name="calendar-outline" size={20} color="#A0A0A0" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Set Current Job Application Status:</Text>
                        <View style={styles.statusContainer}>
                            <CustomDropdown
                                placeholder="Select Status"
                                value={ReturnJobApplicationStatusTextValueById(formData.job_application_status)}
                                onPress={() => setShowJobApplicationStatusModal(true)}
                                icon="eye-outline"
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
                        <Text style={styles.proceedButtonText}>Proceed</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

            <CustomSelectJobApplicationStatus
                visible={showJobApplicationStatusModal}
                onClose={() => setShowJobApplicationStatusModal(false)}
                selectedStatusId={formData.job_application_status}
                setSelectedJobApplicationStatusId={setSelectedJobApplicationStatusId}
                handleSelectJobApplicationStatus={() => setShowJobApplicationStatusModal(false)}
                isButtonHidden={true}
            />

            <CustomSelectEmploymentTypeStatus
                visible={showEmploymentTypeModal}
                onClose={() => setShowEmploymentTypeModal(false)}
                selectedStatusId={formData.employment_type}
                setSelectedEmploymentTypeId={setSelectedEmploymentTypeId}
                handleSelectEmploymentType={() => setShowEmploymentTypeModal(false)}
                isButtonHidden={true}
            />

            <CustomSelectWorkArrangementStatus
                visible={showWorkArrangementModal}
                onClose={() => setShowWorkArrangementModal(false)}
                selectedStatusId={formData.work_arrangement}
                setSelectedWorkArrangementId={setSelectedWorkArrangementId}
                handleSelectWorkArrangement={() => setShowWorkArrangementModal(false)}
                isButtonHidden={true}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </>
    );
};

export default CreateJobApplicationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#054B63',
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
        marginLeft: 10,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 30,
        lineHeight: 22,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#052731',
        borderWidth: 2,
        borderColor: '#3A6A6A',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 15,
        color: 'white',
        fontSize: 16,
    },
    textArea: {
        minHeight: 150,
        paddingTop: 15,
    },
    focusedInput: {
        borderColor: '#FF6B35',
    },
    dropdown: {
        backgroundColor: '#052731',
        borderWidth: 2,
        borderColor: '#3A6A6A',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        color: 'white',
        fontSize: 16,
    },
    placeholderText: {
        color: '#A0A0A0',
    },
    dateInput: {
        backgroundColor: '#052731',
        borderWidth: 2,
        borderColor: '#3A6A6A',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: 'white',
        fontSize: 16,
    },
    statusContainer: {
        position: 'relative',
    },
    proceedButton: {
        backgroundColor: '#FF6B35',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginVertical: 14,
        marginBottom: 50,
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});