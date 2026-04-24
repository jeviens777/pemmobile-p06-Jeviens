import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ item, onPress, grid }) {
    return (
  <TouchableOpacity
    style={[
      styles.card,
      grid ? styles.gridCard : styles.listCard
    ]}
    onPress={() => onPress(item)}
  >
      <Text style={styles.name}numberOfLines={1}>
        {item.emoji} {item.name}
      </Text>
      <Text>{item.category}</Text>
      <Text>Rp {item.price}</Text>
      <Text>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fedfdf',
    minHeight: 110,
    padding: 12,
    margin: 6,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
  width: '100%',
  height: 100,   // 🔥 samakan semua
  borderRadius: 10,
  marginBottom: 8,
},
name: {
  fontWeight: 'bold',
  fontSize: 14,
},
gridCard: {
  flex: 1,
},

listCard: {
  width: '100%',
},
});