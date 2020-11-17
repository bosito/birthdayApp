import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    containerOpcion: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styeContainer: {
        backgroundColor: '#14274e',
    },
    containerSecundary: {
        flex: 1,
        alignItems: 'center', 
    },
    image: {
        width: '100%',
        height: 240,
        marginTop: 50,
        marginBottom: 50,
        resizeMode:'stretch',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    imput: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#394867',
        paddingHorizontal: 20,
        borderRadius: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#394867'
    },
    errorImput: {
        borderColor: 'red',
        borderWidth: 2,
    },
    ViewFooder: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    ListContainer: {
        alignContent: 'center',
        height: '100%',
    },
    BotonClose: {
        backgroundColor: '#820000',
        borderRadius: 50, 
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    textBoton: {
        fontSize: 16,
        textAlign: 'center',
    },
    textDatePiker: {
        justifyContent: 'center',
    },
    scrollist: {
        marginBottom: 50,
        width: '100%',
    },
});