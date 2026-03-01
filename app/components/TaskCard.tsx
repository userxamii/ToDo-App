import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        <Text style={{ fontSize: 18 }}>
          {task.completed ? "✔" : "☐"}
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.text,
          task.completed && styles.completed,
        ]}
      >
        {task.text}
      </Text>

      <TouchableOpacity onPress={onRemove} style={styles.delete}>
        <Text style={{ fontSize: 18, color: "red" }}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    marginLeft: 10,
  },
});