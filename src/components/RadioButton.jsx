import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
const RadioButton = ({ isSelected, onPress, label }) => (
    <TouchableOpacity
        style={styles.radioContainer}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.radioButton}>
        <View style={[
            styles.radioButtonOuter,
            isSelected && styles.radioButtonSelected
        ]}>
            {isSelected && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={[
            styles.radioLabel,
            isSelected && styles.radioLabelSelected
        ]}>
            {label}
        </Text>
        </View>
    </TouchableOpacity>
);

export default RadioButton;

const styles = StyleSheet.create({
    radioContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
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
    radioButtonSelected: {
        borderColor: '#ff6b35',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ff6b35',
    },
    radioLabel: {
        color: '#b0c4c4',
        fontSize: 16,
        flex: 1,
    },
    radioLabelSelected: {
        color: '#ffffff',
    },
})