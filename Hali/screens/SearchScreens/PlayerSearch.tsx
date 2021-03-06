import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import { Text } from '../../components/Themed';
import Button from '../../components/Button';
import { readDistrictQuery, readUsernameQuery } from '../../store';
import { Player } from '../../src/models';


export interface PlayerSearchProps {
    navigation: any;
}

const PlayerSearch = ({ navigation }: PlayerSearchProps) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [players, setPlayers] = React.useState<Player[] | null>();
    const updateSearch = (search: string) => {
        setSearchQuery(search);
    };
    const handleDistrictClick = async () => {
        const result = await readDistrictQuery(searchQuery);
        setPlayers(null);
        setPlayers(result);
    }
    const handleUsernameClick = async () => {
        const result = await readUsernameQuery(searchQuery);
        setPlayers(null);
        setPlayers(result);

    }
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundimage}
                source={require("../../assets/images/football.jpeg")}
            />
            <View style={styles.itemscontainer}>
                <SearchBar
                    placeholder="Search a player..."
                    onChangeText={updateSearch}
                    value={searchQuery}
                    platform={"ios" || "android"}
                    inputContainerStyle={styles.searchcontainer}
                    containerStyle={styles.searchcontainerbackground}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.buttons}>
                <Button buttonText='Search by District' onPress={handleDistrictClick} style={styles.buttonleft}></Button>
                <Button buttonText='Search by Username' onPress={handleUsernameClick} style={styles.button}></Button>
            </View>
            <View style={styles.players}>
                {players?.map((el, i) => <Text style={styles.resultText} key={i}>{el.realname}</Text>)}
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1,
        position: "absolute",
        display: "flex",
        alignSelf: "center",
        width: "100%",
        height: "120%",
        opacity: 0.05,
    },
    text: {
        color: "white",
        fontSize: 48,
        fontWeight: "900",
    },
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(135, 211, 124, 1)",
        justifyContent: "flex-start",
    },
    itemscontainer: {
        display: "flex",
        alignItems: "center",
    },
    subtext: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        marginBottom: 20,
    },
    searchcontainer: {
        backgroundColor: "rgba(255, 255, 255, 1)"
    },
    searchcontainerbackground: {
        backgroundColor: "rgba(135, 211, 124, 1)"
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "1%"
    },
    button: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        width: "45%"

    },
    buttonleft: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        marginRight: "3%",
        width: "45%"

    },
    players: {

    },
    resultText: {
        color: "#eeeeee",
        fontWeight: "600",
        marginTop: 8,
        alignSelf: "center",
        fontSize: 20
    }
});

export default PlayerSearch;