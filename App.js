import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskList([...taskList, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
      Keyboard.dismiss();
    }
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vantus</Text>
        <Text style={styles.subtitle}>Your Tasks, Enhanced.</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteBtn}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Write a task...'} 
          placeholderTextColor={'#555'}
          value={task}
          onChangeText={text => setTask(text)} 
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteBtn: {
    color: '#ff453a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1e',
    borderRadius: 30,
    borderColor: '#333',
    borderWidth: 1,
    width: '80%',
    color: '#fff',
  },
  addWrapper: {
    width: 55,
    height: 55,
    backgroundColor: '#0a84ff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 30,
  },
});
