import { BlurView } from 'expo-blur';
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Task } from "../app";

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onRemove,
}) => {
  return (
   <BlurView
  intensity={45}
  tint="light"
  style={[
    styles.card,
    task.completed && styles.completedCard
  ]}
>
  <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
    {task.completed && <Text style={styles.check}>✓</Text>}
  </TouchableOpacity>

  <Text
    style={[
      styles.text,
      task.completed && styles.completedText,
    ]}
  >
    {task.text}
  </Text>

  <TouchableOpacity onPress={onRemove}>
    <Text style={styles.delete}>🚮</Text>
  </TouchableOpacity>
</BlurView>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginBottom: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  completedCard: {
    opacity: 0.5,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#A78BFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  check: {
    color: '#A78BFA',
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    fontSize: 17,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  delete: {
    fontSize: 18,
    color: '#F87171',
  },
});