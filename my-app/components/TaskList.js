import React, {useEffect, useState} from 'react'
import {FlatList, RefreshControl} from 'react-native'
import TaskItem from "./TaskItem";
import {deleteTask, getTasks} from "../api";
import {useIsFocused} from "@react-navigation/native";


const TaskList = () => {

    const [tasks, setTasks] = useState([])

    const [refreshing, setRefreshing] = useState(false)
    
    const isFocused = useIsFocused();
    
    const loadTasks = async () => {
        console.log("loading tasks");
        const data = await getTasks();
        setTasks(data);
    }

    useEffect(() => {
        loadTasks();
    }, [isFocused]);
    
    const handleDelete = async (id) =>{
        await deleteTask(id);
        await loadTasks();
    }

    const renderItem = ({item}) => {
        return <TaskItem task={item} handleDelete={handleDelete}/>;
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        await loadTasks();
        setRefreshing(false)
    })

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id + ''}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    colors={["#78e08f"]}
                    onRefresh={() => onRefresh()}
                    progressBackgroundColor='#0a3d62'
                />
            }
        />
    );
};

export default TaskList;