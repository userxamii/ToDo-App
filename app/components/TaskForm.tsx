import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim() === '') return;
    onAddTask(text);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        placeholder="Add a new task"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
  <Text style={styles.buttonText}>Add</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
    button: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 18,
    backgroundColor: 'rgba(138, 15, 187, 0.81)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
    buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    
  }
});
export default TaskForm;