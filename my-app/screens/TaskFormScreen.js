import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

import Layout from '../components/Layout'
import {saveTasks, getTask, updateTask} from "../api";


const TaskFormScreen = ({navigation, route}) => {


    const [task, setTask] = useState({
        title: "",
        description: "",
    });

    const [editing, setEditing] = useState(false);

    const handleChange = (name, value) => setTask({...task, [name]: value});

    const handleSubmit = async () => {
        if(!editing){
            await saveTasks(task)
        }else{
            await updateTask(route.params.id, task)
        }
        navigation.navigate('Home')
    }

    useEffect(() => { 
        if (route.params && route.params.id) {
            navigation.setOptions({headerTitle: 'Updating tasks'});
            setEditing(true);
            (async () => {
                const task = await getTask(route.params.id)
                setTask({title: task.title, description: task.description});
            })();

        }

    },[]);

    return (
        <Layout>
            <TextInput style={styles.input}
                       placeholder={"Write a title"}
                       placeholderTextColor='#576574'
                       onChangeText={(text) => handleChange('title', text)}
                       value={task.title}
            /> 
            <TextInput style={styles.input}
                       placeholder={"Write a description"}
                       placeholderTextColor='#576574'
                       onChangeText={text => handleChange('description', text)}
                       value={task.description}
            />

            {
                editing ? (
                    <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Update Task</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save Task</Text>
                    </TouchableOpacity>
                )
            }
            

        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        fontSize: 14,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        color: 'white',

    },
    buttonSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#10ac84',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    buttonUpdate: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#e58e26',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },

})

export default TaskFormScreen
