import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
        // Load tasks from AsyncStorage on mount
    useEffect(() => {
    const loadTasks = async () => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
        } catch (error) { Alert.alert('Error loading tasks'); }
    };
    loadTasks();
    }, []);

    // Persist tasks to AsyncStorage on change
    useEffect(() => { AsyncStorage.setItem('tasks', JSON.stringify(tasks));}, [tasks]);

    const addTask = (text: string) => {
        if (text.trim() === '') return;
        const newTask: Task = { id: Date.now().toString(), text, completed: false };
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id: string) => {
    setTasks(tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
    ));
    };

    const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    };

    const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0'
    },
    scrollView: {
        marginTop: 20
    },
    });
    return (
        <View style={styles.container}>
            <TaskForm onAddTask={addTask} />
                <ScrollView style={styles.scrollView}>
                 {tasks.map((task) => (
                    <TaskCard key={task.id} task={task}
                    onToggle={() => toggleTask(task.id)}
                    onRemove={() => removeTask(task.id)} >
                    </TaskCard>
                 ))}
                </ScrollView>
        </View>
    );
}