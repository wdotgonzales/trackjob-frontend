import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDateToMonDDYYYY, timeAgo } from "../utils/utils";

const cardBackgroundColor = (jobApplicationStatus) => {
    switch(jobApplicationStatus){
        case "Applied":
            return "#7777FF";
        case "Rejected":
            return "#BE2323";
        case "Ghosted":
            return "#303030";
        case "Under Review":
            return "#FFC107";
        case "Interview Scheduled":
            return "#CB7900";
        case "Offer Received":
            return "#4CAF50";
        case "Closed/Withdraw":
            return "#7b7b7bff"
        case "Accepted Offer":
            return "#4EFF9B"
    }
};

const cardBadgeBackgroundColor = (jobApplicationStatus) => {
    switch(jobApplicationStatus){
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
    }
};

const cardTextColor = (jobApplicationStatus) => {
    switch(jobApplicationStatus){
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
            return "#000000"
    }
}

const JobApplicationCard = ({ 
    jobTitle, 
    companyName, 
    jobLocation, 
    jobApplicationStatus, 
    workArrangement,
    employmentType, 
    dateApplied, 
    createdAt, 
    updatedAt,
    onPress,
    }) => {

    const backgroundColor = cardBackgroundColor(jobApplicationStatus);
    const badgeColor = cardBadgeBackgroundColor(jobApplicationStatus);
    const textColor = cardTextColor(jobApplicationStatus);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.cardContainer, {backgroundColor: backgroundColor}]}>
            {/* Header with logo and basic info */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Entypo name="suitcase" size={30} color={backgroundColor} />
                </View>
                
                <View style={styles.headerInfo}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.jobTitle, {color: textColor}]}>{jobTitle}</Text>
                    </View>
                    <Text style={[styles.companyName, {color: textColor}]}>{companyName}</Text>
                    
                    <View style={styles.detailsRow}>
                        <View style={styles.locationRow}>
                            <MaterialIcons name="location-on" size={14} color={textColor} />
                            <Text style={[styles.location, {color: textColor}]}>{jobLocation}</Text>
                        </View>
                        <View style={styles.locationRow}>
                            <MaterialCommunityIcons name="folder-check" size={14} color={textColor} />
                            <Text style={[styles.location, {marginLeft: 2}, {color: textColor}]}>{formatDateToMonDDYYYY(dateApplied)}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsRow}>

                        <View style={styles.updateRow}>
                            <MaterialIcons name="access-time" size={14} color={textColor} />
                            <Text style={[styles.updateText, {color: textColor}]}>{timeAgo(createdAt)}</Text>
                        </View>
                        <View style={styles.updateRow}>
                            <MaterialIcons name="edit" size={14} color={textColor} />
                            <Text style={[styles.time, {color: textColor}]}>{timeAgo(updatedAt)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom section with tags and apply button */}
            <View style={styles.footer}>
                <View style={styles.leftSection}>
                    <View style={styles.tagsContainer}>
                        <View style={[styles.tag, {borderColor: textColor}]}>
                            <Text style={[styles.tagText, {color: textColor}]}>{employmentType}</Text>
                        </View>
                        <View style={[styles.tag, {borderColor: textColor}]}>
                            <Text style={[styles.tagText, {color: textColor}]}>{workArrangement}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.rightSection}>
                    <View style={[styles.applyButton, {backgroundColor: badgeColor}]}>
                        <Text style={styles.applyButtonText}>{jobApplicationStatus}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
};

export default JobApplicationCard;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    jobTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 1,
    },
    materialTag: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500',
    },
    companyName: {
        fontSize: 14,
        marginBottom: 8,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    location: {
        fontSize: 12,
    },
    time: {
        fontSize: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    leftSection: {
        flex: 1,
    },
    updateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginTop: 5,
    },
    updateText: {
        fontSize: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 6,
    },
    tag: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    applyButton: {
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 8,
        minWidth: 80,
    },
    applyButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
});