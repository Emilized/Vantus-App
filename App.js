import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([{ id: Date.now().toString(), text: task }, ...tasks]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vantus 2.0</Text>
      <FlatList 
        data={tasks} 
        keyExtractor={item => item.id}
        renderItem={({item}) => <View style={styles.card}><Text style={styles.cardText}>{item.text}</Text></View>} 
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputArea}>
        <TextInput style={styles.input} value={task} onChangeText={setTask} placeholder="New Task..." placeholderTextColor="#444" />
        <TouchableOpacity style={styles.btn} onPress={addTask}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  card: { backgroundColor: '#111', padding: 20, borderRadius: 10, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#0a84ff' },
  cardText: { color: '#fff', fontSize: 16 },
  inputArea: { flexDirection: 'row', marginBottom: 40, alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 10, marginRight: 10 },
  btn: { backgroundColor: '#0a84ff', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 24 }
});
