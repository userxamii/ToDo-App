import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
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
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 50,
    marginBottom: 20,
    color: 'white',
    letterSpacing: 1,
  },
});
    const { width } = Dimensions.get('window');

return (
  <LinearGradient
    colors={['#0F172A', '#6e03b6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.header}>My Tasks</Text>

      <TaskForm onAddTask={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 30, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => toggleTask(item.id)}
            onRemove={() => removeTask(item.id)}
          />
        )}
      />
    </SafeAreaView>
  </LinearGradient>
);
}