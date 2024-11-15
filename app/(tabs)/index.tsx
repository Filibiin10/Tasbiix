import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import masjid from '../../assets/images/masjid.jpg';

export default function RosaryCounter() {
  const [count, setCount] = useState(0);

  // Key to store the count value
  const STORAGE_KEY = 'rosary_count';

  // Load count from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCount = async () => {
      try {
        const savedCount = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedCount !== null) {
          setCount(parseInt(savedCount, 10)); // Ensure it's converted to a number
        }
      } catch (error) {
        console.error('Failed to load count from AsyncStorage:', error);
      }
    };
    loadCount();
  }, []);

  // Save count to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCount = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, count.toString());
      } catch (error) {
        console.error('Failed to save count to AsyncStorage:', error);
      }
    };
    saveCount();
  }, [count]);

  const increment = () => setCount(count + 1);
  const reset = () => setCount(0);

  return (
    <View style={styles.backgroundContainer}>
      <Image source={masjid} style={styles.background} />
      <View style={styles.overlay}>
        {/* Title */}
        <Text style={styles.title}>Rosary Counter</Text>
        
        {/* Counter Circle */}
        <View style={styles.circleContainer}>
          <Text style={styles.counterText}>{count}</Text>
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={increment} style={styles.incrementButton}>
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={styles.resetButton}>
            <Ionicons name="refresh" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  counterText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  incrementButton: {
    backgroundColor: '#FF6F61',
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#FF6F61',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  resetButton: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
