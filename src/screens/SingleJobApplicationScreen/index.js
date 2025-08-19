import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import CustomModal from "../../components/CustomModal";
import { httpClient } from "../../services/httpClient";
import CustomLoader from "../../components/CustomLoader";
import { showToast } from "../../components/CustomToaster";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import CustomSelectJobApplicationStatus from "../../components/CustomSelectJobapplicationStatus";
import CustomSelectWorkArrangementStatus from "../../components/CustomSelectWorkArrangementStatus";
import CustomSelectEmploymentTypeStatus from "../../components/CustomSelectEmploymentTypeStatus";

const showJobApplicationStatusLogo = (job_application_status) => {
    switch(job_application_status) {
        case "Applied":
            return <FontAwesome5 name="suitcase" size={28} color="white" />;
        case "Rejected":
            return <Feather name="x" size={28} color="white" />
        case "Ghosted":
            return <FontAwesome5 name="ghost" size={28} color="white" />;
        case "Under Review":
            return <MaterialCommunityIcons name="text-box-search-outline" size={28} color="black" />;
        case "Interview Scheduled":
            return <FontAwesome5 name="calendar-check" size={28} color="white" />;
        case "Offer Received":
            return <FontAwesome5 name="hand-holding" size={28} color="white" />;
        case "Closed/Withdraw":
            return <Ionicons name="document-lock" size={28} color="white" />;
        case "Accepted Offer":
            return <FontAwesome name="check-circle" size={28} color="white" />;
        default:
            return <FontAwesome5 name="suitcase" size={24} color="white" />;
    }
}

const cardJobApplicationStatusBackgroundColor = (job_application_status) => {
    switch(job_application_status){
        case "Applied":
            return "#0055FF";
        case "Rejected":
            return "#FF0000";
        case "Ghosted":
            return "#262626";
        case "Under Review":
            return "#FB7900";
        case "Interview Scheduled":
            return "#FB8C00";
        case "Offer Received":
            return "#388E3C";
        case "Closed/Withdraw":
            return "#616161"
        case "Accepted Offer":
            return "#21C400"
        default:
            return "#7777FF";
    }
};

const cardJobApplicationTextColor = (job_application_status) => {
    switch(job_application_status){
        case "Applied":
            return "#FFFFFF";
        case "Rejected":
            return "#FFFFFF";
        case "Ghosted":
            return "#FFFFFF";
        case "Under Review":
            return "#000000";
        case "Interview Scheduled":
            return "#FFFFFF";
        case "Offer Received":
            return "#FFFFFF";
        case "Closed/Withdraw":
            return "#FFFFFF";
        case "Accepted Offer":
            return "#FFFFFF"
        default:
            return "#FFFFFF";
    }
}

const cardJobApplicationText = (job_application_status) => {
    switch(job_application_status){
        case "Applied":
            return <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Applied</Text>
        case "Rejected":
            return <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Rejected</Text>
        case "Ghosted":
            return <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Ghosted</Text>
        case "Under Review":
            return <>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Under</Text>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 12, textAlign: "center", opacity: 0.8,}}>Review</Text>
            </>
        case "Interview Scheduled":
            return <>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Interview</Text>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 12, textAlign: "center", opacity: 0.8,}}>Scheduled</Text>
            </>
        case "Offer Received":
            return <>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Offer</Text>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 12, textAlign: "center", opacity: 0.8,}}>Received</Text>
            </>
        case "Closed/Withdraw":
            return <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Closed/Withdraw</Text>
        case "Accepted Offer":
            return <>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Accepted</Text>
                    <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 12, textAlign: "center", opacity: 0.8,}}>Offer</Text>
            </>
        default:
            return <Text style={{color: cardJobApplicationTextColor(job_application_status), fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Applied</Text>
    }
}

const cardWorkArrangementContent = (work_arrangement) => {
    switch(work_arrangement){
        case "On-site":
            return <>
                <MaterialCommunityIcons name="office-building-marker" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>On-site</Text>
            </>;
        case "Remote":
            return <>
                <FontAwesome name="home" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Remote</Text>
            </>;
        case "Hybrid":
            return <>
                <FontAwesome5 name="yin-yang" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Hybrid</Text>
            </>;    
    }
}

const cardEmploymentTypeContent = (employment_type) => {
    switch(employment_type){
        case "Full-time": 
            return <>
                <AntDesign name="clockcircle" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Full-time</Text>
            </>;
        case "Part-time": 
            return <>
                <FontAwesome6 name="clock-rotate-left" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Part-time</Text>
            </>;
        case "Contract": 
            return <>
                <FontAwesome5 name="file-contract" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Contract</Text>
            </>;
        case "Internship": 
            return <>
                <AntDesign name="team" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Internship</Text>
            </>;
        case "Temporary": 
            return <>
                <MaterialCommunityIcons name="folder-clock" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Temporary</Text>
            </>;
        case "Freelance": 
            return <>
                <MaterialCommunityIcons name="briefcase-clock" size={28} color="white" />
                <Text style={{color: "white", fontSize: 14, fontWeight: "600", marginTop: 8, textAlign: "center"}}>Freelance</Text>
            </>;
    }
}

const cardWorkArrangementBackgroundColor = (work_arrangement) => {
    switch(work_arrangement){
        case "On-site":
            return "#0B3C5D";
        case "Remote":
            return "#1E2A38";
        case "Hybrid":
            return "#B22222";
    }
};

const cardEmploymentTypeBackgroundColor = (employment_type) => {
    switch(employment_type){
        case "Full-time": 
            return "#1B263B"
        case "Part-time": 
            return "#0D6EFD"
        case "Contract": 
            return "#FF6B6B"
        case "Internship": 
            return "#FFD93D"
        case "Temporary": 
            return "#6BCB77"
        case "Freelance": 
            return "#A66DD4"
    }
}

const SingleJobApplicationScreen = ({ navigation, route }) => {
    const [jobApplicationId, setJobApplicationId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [jobApplication, setJobApplication] = useState(null);

    const [showJobApplicationStatusModal, setShowJobApplicationStatusModal] = useState(false);
    const [selectedJobApplicationStatusId, setSelectedJobApplicationStatusId] = useState(null);
    
    const [showWorkArrangementModal, setShowWorkArrangementModal] = useState(false);
    const [selectedWorkArrangementId, setSelectedWorkArrangementId] = useState(null);

    const [showEmploymentTypeModal, setShowEmploymentTypeModal] = useState(false);
    const [selectedEmploymentTypeId, setSelectedEmploymentTypeId] = useState(null);

    // Combined useEffect to handle initial data loading
    useEffect(() => {
        const { job_application_id } = route.params || {};
        
        console.log('Route params:', route.params);
        console.log('Job application ID:', job_application_id);
        
        if (job_application_id) {
            setJobApplicationId(job_application_id);
            fetchJobApplicationInformationById(job_application_id);
        } else {
            showToast('error', 'Error', 'No job application ID provided');
            navigation.goBack();
        }
    }, []);

    const deleteJobApplicationById = async (jobApplicationId) => {
        setShowLoader(true);
        try {
            const response = await httpClient.delete(`job_application/${jobApplicationId}/`);
            
            if (response.ok || response.status === 204) {
                showToast('success', 'Success', 'Job Application is deleted.');
                navigation.goBack();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.log('Delete error:', error.message);
            if (error.message === 'Network request failed' && jobApplicationId) {
                // Assume delete succeeded if server processed it
                showToast('success', 'Success', 'Job Application is deleted.');
                navigation.goBack();
            } else {
                showToast('error', 'Error', 'Contact Administrator');
                console.log(error);
            }
        } finally {
            setShowLoader(false);
        }
    };

    const fetchJobApplicationInformationById = async (jobApplicationId) => {
        if (!jobApplicationId) {
            console.log('No job application ID provided to fetch');
            return;
        }

        setShowLoader(true);
        try {
            console.log(`Fetching job application with ID: ${jobApplicationId}`);
            
            const response = await httpClient.get(`job_application/${jobApplicationId}/`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Debug the actual response structure
            console.log('Full API Response:', result);
            console.log('Response status:', response.status);
            
            // Handle different possible response structures
            const jobData = result.data || result || null;
            
            if (jobData) {
                console.log('Setting job application data:', jobData);
                setJobApplication(jobData);
            } else {
                console.log('No job application data found in response');
                showToast('error', 'Error', 'Job application not found');
                navigation.goBack();
            }
        } catch (error) {
            console.log('Fetch error:', error);
            showToast('error', 'Error', 'Failed to load job application');
            navigation.goBack();
        } finally {
            setShowLoader(false);
        }
    }

    const handleDeletePress = () => {
        setShowDropdown(false);
        setShowModal(true);
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleDelete = () => {
        setShowModal(false);
        deleteJobApplicationById(jobApplicationId);
    }

    // Function to handle opening job link in browser
    const handleOpenJobLink = async () => {
        const jobLink = jobApplication?.job_posting_link;
        
        if (!jobLink) {
            showToast('error', 'Error', 'No job link available');
            return;
        }

        try {
            // Check if the URL can be opened
            const supported = await Linking.canOpenURL(jobLink);
            
            if (supported) {
                await Linking.openURL(jobLink);
            } else {
                Alert.alert(
                    'Cannot Open Link',
                    'Unable to open the job posting link. The URL might be invalid.',
                    [{ text: 'OK', style: 'default' }]
                );
            }
        } catch (error) {
            console.log('Error opening link:', error);
            showToast('error', 'Error', 'Failed to open job link');
        }
    };

    // Helper function to safely get job status
    const getJobStatus = () => {
        return jobApplication?.job_application_status?.label || 'N/A';
    }

    const getWorkArrangement = () => {
        return jobApplication?.work_arrangement?.label || 'N/A'
    }

    const getEmploymentType = () => {
        return jobApplication?.employment_type.label || 'N/A'
    }

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    }

    const handleOpenJobApplicationStatusModal = () => {
        setShowJobApplicationStatusModal(true);
    }

    const handleSelectJobApplicationStatus = async () => {
        try {
            // Make PATCH request to the correct endpoint with job application ID
            const response = await httpClient.patch(`job_application/${jobApplicationId}/`, 
                { job_application_status: selectedJobApplicationStatusId });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showToast('success', 'Success', 'Job application status is updated.');

        } catch (error) {
            console.log('Update error:', error);
            showToast('error', 'Error', 'Contact Administrator');
        } finally {
            // Refresh the job application data and close modal
            fetchJobApplicationInformationById(jobApplicationId);
            setShowJobApplicationStatusModal(false);
        }
    }

    const handleOpenWorkArrangementModal = () => {
        setShowWorkArrangementModal(true)
    }

    const handleSelectWorkArrangement = async () => {
        try {
            const response = await httpClient.patch(`job_application/${jobApplicationId}/`, 
                { work_arrangement: selectedWorkArrangementId });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showToast('success', 'Success', 'Job application status is updated.');
        } catch (error) {
            console.log('Update error:', error);
            showToast('error', 'Error', 'Contact Administrator');
        } finally {
            fetchJobApplicationInformationById(jobApplicationId);
            setShowWorkArrangementModal(false);
        }
    }

    const handleOpenEmploymentTypeModal = () => {   
        setShowEmploymentTypeModal(true);
    }

    const handleSelectEmploymentType = async () => {
        try {
            const response = await httpClient.patch(`job_application/${jobApplicationId}/`, 
                { employment_type: selectedEmploymentTypeId });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showToast('success', 'Success', 'Employment type is updated.');
        } catch (error) {
            console.log('Update error:', error);
            showToast('error', 'Error', 'Contact Administrator');
        } finally {
            fetchJobApplicationInformationById(jobApplicationId);
            setShowEmploymentTypeModal(false);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    
                    <Text style={styles.headerTitle}>Job Details</Text>
                    
                    <View style={styles.menuContainer}>
                        <TouchableOpacity 
                            style={styles.menuButton}
                            onPress={toggleDropdown}
                        >
                            <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        
                        {showDropdown && (
                            <View style={styles.dropdown}>
                                <TouchableOpacity 
                                    style={styles.dropdownItem}
                                    onPress={handleDeletePress}
                                >
                                    <Ionicons name="trash-outline" size={18} color="#333" />
                                    <Text style={styles.dropdownText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {jobApplication ? (
                        <>
                            {/* Job Header Card */}
                            <View style={styles.jobCard}>
                                <View style={styles.jobHeader}>
                                    <View style={styles.companyIcon}>
                                        <Ionicons name="briefcase" size={40} color="#F97009" />
                                    </View>
                                    <View style={styles.jobInfo}>
                                        <Text style={styles.jobTitle}>
                                            {jobApplication.position_title || 'Position Title Not Available'}
                                        </Text>
                                        <Text style={styles.companyName}>
                                            {jobApplication.company_name || 'Company Name Not Available'}
                                        </Text>
                                        <View style={styles.locationRow}>
                                            <Ionicons name="location-outline" size={14} color="#FFFFFF" />
                                            <Text style={styles.locationText}>
                                                {jobApplication.job_location || 'Location Not Specified'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Job Description */}
                            <View style={styles.descriptionCard}>
                                <Text style={styles.sectionTitle}>Job Description:</Text>
                                <Text style={styles.descriptionText}>
                                    {jobApplication.job_description || 'No description available'}
                                </Text>
                            </View>

                            {/* Status Cards Row */}
                            <View style={styles.statusRow}>
                                
                                <TouchableOpacity
                                    onPress={handleOpenJobApplicationStatusModal} 
                                    style={[
                                        styles.statusCard, 
                                        {backgroundColor: cardJobApplicationStatusBackgroundColor(getJobStatus())}
                                    ]}>
                                        {showJobApplicationStatusLogo(getJobStatus())}
                                        {cardJobApplicationText(getJobStatus())}
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    onPress={handleOpenWorkArrangementModal}
                                    style={[styles.statusCard, { backgroundColor: cardWorkArrangementBackgroundColor(getWorkArrangement()) }]}>
                                        {cardWorkArrangementContent(getWorkArrangement())}
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    onPress={handleOpenEmploymentTypeModal} 
                                    style={[styles.statusCard, { backgroundColor: cardEmploymentTypeBackgroundColor(getEmploymentType()) }]}>
                                        {cardEmploymentTypeContent(getEmploymentType())}
                                </TouchableOpacity>
                            </View>

                            {/* Date Applied */}
                            <View style={styles.infoCard}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoIcon}>
                                        <Ionicons name="calendar" size={20} color="#FFFFFF" />
                                    </View>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>Date Applied:</Text>
                                        <Text style={styles.infoValue}>
                                            {formatDate(jobApplication.date_applied)}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Job Link - Updated with browser redirect functionality */}
                            <TouchableOpacity 
                                style={[
                                    styles.linkCard,
                                    !jobApplication.job_posting_link && styles.linkCardDisabled
                                ]}
                                onPress={handleOpenJobLink}
                                disabled={!jobApplication.job_posting_link}
                            >
                                <View style={styles.linkRow}>
                                    <View style={styles.linkIcon}>
                                        <Text style={styles.linkText}>URL</Text>
                                    </View>
                                    <Text style={[
                                        styles.linkLabel,
                                        !jobApplication.job_posting_link && styles.linkLabelDisabled
                                    ]}>
                                        {jobApplication.job_posting_link ? 'Job Link:' : 'No Job Link Available'}
                                    </Text>
                                    {jobApplication.job_posting_link && (
                                        <Ionicons name="open-outline" size={20} color="#FFFFFF" />
                                    )}
                                </View>
                            </TouchableOpacity>

                            {/* Reminders */}
                            <TouchableOpacity style={[styles.linkCard, {marginBottom: 50}]} onPress={() => Alert.alert("Unavailable", "Coming Soon...")}>
                                <View style={styles.linkRow}>
                                    <View style={styles.reminderIcon}>
                                        <Ionicons name="bulb" size={20} color="#F97009" />
                                    </View>
                                    <Text style={styles.linkLabel}>Reminders</Text>
                                    <Ionicons name="open-outline" size={20} color="#FFFFFF" />
                                </View>
                            </TouchableOpacity>
                        </>
                    ) : (
                        // Show message when no data is available and not loading
                        !showLoader && (
                            <View style={styles.noDataContainer}>
                                <Ionicons name="document-outline" size={64} color="#B0C4DE" />
                                <Text style={styles.noDataText}>
                                    No job application data available
                                </Text>
                                <TouchableOpacity 
                                    style={styles.retryButton}
                                    onPress={() => jobApplicationId && fetchJobApplicationInformationById(jobApplicationId)}
                                >
                                    <Text style={styles.retryButtonText}>Retry</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    )}
                </ScrollView>
            </SafeAreaView>

            <CustomModal
                visible={showModal}
                onClose={handleCancel}
                onConfirm={handleDelete}
                title="Are you sure?"
                message="This will delete this job application."
            />

            {showLoader && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                />
            )}

            {jobApplication && <CustomSelectJobApplicationStatus
                visible={showJobApplicationStatusModal}
                onClose={() => setShowJobApplicationStatusModal(false)}
                selectedStatusId={jobApplication.job_application_status.id}
                handleSelectJobApplicationStatus={handleSelectJobApplicationStatus}
                setSelectedJobApplicationStatusId={setSelectedJobApplicationStatusId}
            />}

            {jobApplication && <CustomSelectWorkArrangementStatus 
                visible={showWorkArrangementModal}
                onClose={() => setShowWorkArrangementModal(false)}
                selectedStatusId={jobApplication.work_arrangement.id}
                handleSelectWorkArrangement={handleSelectWorkArrangement}
                setSelectedWorkArrangementId={setSelectedWorkArrangementId}
            />}

            {jobApplication && <CustomSelectEmploymentTypeStatus
                visible={showEmploymentTypeModal}
                onClose={() => setShowEmploymentTypeModal(false)}
                selectedStatusId={jobApplication.employment_type.id}
                handleSelectEmploymentType={handleSelectEmploymentType}
                setSelectedEmploymentTypeId={setSelectedEmploymentTypeId}
            />}
        </>
    )
}

export default SingleJobApplicationScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#052731",
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#052731",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        color: "#ffffffff",
        fontSize: 20,
        fontWeight: "500",
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 16,
    },
    menuContainer: {
        position: 'relative',
    },
    menuButton: {
        padding: 8,
        marginRight: -8,
    },
    dropdown: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minWidth: 100,
        zIndex: 1000,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    dropdownText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '400',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    jobCard: {
        backgroundColor: '#1A4A5C',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    jobHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    companyIcon: {
        width: 80,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jobInfo: {
        flex: 1,
    },
    jobTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    companyName: {
        color: '#B0C4DE',
        fontSize: 16,
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        color: '#B0C4DE',
        fontSize: 14,
    },
    descriptionCard: {
        backgroundColor: '#1A4A5C',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    descriptionText: {
        color: '#B0C4DE',
        fontSize: 14,
        lineHeight: 20,
    },
    statusRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    statusCard: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
        borderColor: "white",
        borderWidth: 1,
    },
    offerCard: {
        backgroundColor: '#4CAF50',
    },
    onsiteCard: {
        backgroundColor: '#2196F3',
    },
    fulltimeCard: {
        backgroundColor: '#607D8B',
    },
    statusTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'center',
    },
    statusSubtitle: {
        color: '#FFFFFF',
        fontSize: 12,
        opacity: 0.8,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#1A4A5C',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#2196F3',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    infoValue: {
        color: '#B0C4DE',
        fontSize: 16,
    },
    linkCard: {
        backgroundColor: '#1A4A5C',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    linkIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#607D8B',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    reminderIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    noDataText: {
        color: '#B0C4DE',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#F97009',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});