import { Text, Pressable, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function FeaturesButton({ contents, setContents }) {
    const router = useRouter();

    const nextButtonFeature = () => {
        const findCurrentChosenFeatureIndex = contents.findIndex(content => content.isChosen === true);

        if (findCurrentChosenFeatureIndex == contents.length - 1) {
            router.replace('/Login');
            return;
        }

        selectFeature(findCurrentChosenFeatureIndex + 1);
    }

    const selectFeature = (index) => {
        const updatedContentsVisiblity = contents.map((item, i) => ({
            ...item,
            isChosen: i === index,
        }));
        setContents(updatedContentsVisiblity);
    };

    return <View style={styles.container}>
        <Pressable style={[styles.button, styles.skipButton]} onPress={() => router.replace('/Login')}>
            <View >
                <Text style={styles.skipButtonText}>SKIP</Text>
            </View>
        </Pressable>
        <Pressable style={[styles.button, styles.nextButton]} onPress={nextButtonFeature}>
            <View>
                <Text style={styles.nextButtonText}>NEXT</Text>
            </View>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        gap: 5
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 47,
        borderWidth: 1,
    },

    skipButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },

    nextButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },

    skipButtonText: {
        color: "white",
        fontWeight: "bold"
    },

    nextButtonText: {
        color: "black",
        fontWeight: "bold"
    }
});
