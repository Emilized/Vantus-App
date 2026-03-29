import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskList([{ id: Date.now().toString(), text: task, completed: false }, ...taskList]);
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
      
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>V</Text>
        </View>
        <View>
          <Text style={styles.title}>Vantus 2.0</Text>
          <Text style={styles.subtitle}>Production Ready Build</Text>
        </View>
      </View>

      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteBtn}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one below!</Text>}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'What needs to be done?'} 
          placeholderTextColor={'#666'}
          value={task}
          onChangeText={text => setTask(text)} 
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 70, paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  logoCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0a84ff', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  logoText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 12, color: '#0a84ff', textTransform: 'uppercase', letterSpacing: 1 },
  listContainer: { paddingHorizontal: 25 },
  item: { backgroundColor: '#1c1c1e', padding: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  itemText: { color: '#fff', fontSize: 16, width: '70%' },
  deleteBtn: { color: '#ff453a', fontSize: 14, fontWeight: '600' },
  emptyText: { color: '#444', textAlign: 'center', marginTop: 50, fontSize: 16 },
  inputWrapper: { position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25 },
  input: { paddingVertical: 15, paddingHorizontal: 25, backgroundColor: '#1c1c1e', borderRadius: 30, color: '#fff', width: '78%', fontSize: 16, borderWidth: 1, borderColor: '#333' },
  addWrapper: { width: 60, height: 60, backgroundColor: '#0a84ff', borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  addText: { color: '#fff', fontSize: 35, fontWeight: '300' },
});
