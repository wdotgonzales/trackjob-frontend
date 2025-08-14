
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const JobApplicationIconComponent = ({ 
    iconPath,
    iconWidth,
    iconHeight,
    backgroundColor,
    textColor,
    text,
    isActive,
    textMarginTop, // optional margin top for text
    onPress, // Add onPress prop
}) => {
    return (
        <TouchableOpacity 
            style={[
                style.bodyContainer, 
                { backgroundColor: backgroundColor },
                isActive && style.activeBorder
            ]}
            onPress={onPress} // Add onPress handler
            activeOpacity={0.7} // Optional: adds visual feedback
        >
            <View style={style.contentContainer}>
                <Image 
                    source={iconPath} 
                    style={{
                        width: iconWidth,
                        height: iconHeight,
                        resizeMode: 'contain'
                    }}
                />
                <Text 
                    style={[
                        style.text, 
                        { color: textColor },
                        textMarginTop !== undefined && { marginTop: textMarginTop }
                    ]}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default JobApplicationIconComponent;

const style = StyleSheet.create({
    bodyContainer: {
        height: 78,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    contentContainer: {
        alignItems: "center",
    },
    text: {
        marginTop: 4, // default
        fontSize: 10,
    },
    activeBorder: {
        borderWidth: 2,
        borderColor: '#ffffffff',
    }
});