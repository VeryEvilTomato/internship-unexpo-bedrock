import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Debugging warning removal
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

AppRegistry.registerComponent(appName, () => App);
