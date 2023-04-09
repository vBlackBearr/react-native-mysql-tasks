import React from 'react'
import {Text, TouchableOpacity} from "react-native";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";



import homeScreen from "./screens/HomeScreen";
import TaskFormScreen from "./screens/TaskFormScreen";

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={homeScreen} 
                        options={({navigation}) => ({
                            title: "Task App",
                            headerStyle:{backgroundColor: "#222f3e"},
                            headerTitleStyle: {color: "#ffffff"},
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen')}>
                                    <Text style={{color: '#ffffff', marginRight: 20, fontSize: 16}}>New</Text>
                                </TouchableOpacity>
                            ),
                        })} />
                <Stack.Screen name="TaskFormScreen" component={TaskFormScreen} 
                              options={{
                                  title: 'Create Task',
                                  headerStyle: {
                                      backgroundColor: "#222f3e"
                                  },
                                  headerTitleStyle: { color: '#ffffff'},
                                  headerTintColor:  '#ffffff' 
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App