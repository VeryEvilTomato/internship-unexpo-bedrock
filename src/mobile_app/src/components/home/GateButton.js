import React from 'react';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

/*
 * Component to open up gate
*/

export default function GateButton() {
    return (
        <View>
            <Button 
                title="Encender"
                onPress={() => alert("Abriendo portón")}
            />
        </View>
    )
}
