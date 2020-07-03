import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Eduardo Barros',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveProject(id) {
    const response = await api.delete(`projects/${id}`);

    if (response.status === 204) {
      const projectIndex = projects.findIndex(project => project.id === id);
      if (projectIndex > -1) {
        const arr = [...projects];
        arr.splice(projectIndex, 1);
        setProjects(arr);
      }
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <View>
              <Text style={styles.project}>{project.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleRemoveProject(project.id);
                }}>
                <Text>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
  },

  project: {
    color: '#ffffff',
    fontSize: 20,
  },

  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
