import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari produk..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      {value !== '' && (
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clear}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  clear: {
    fontSize: 18,
  },
});