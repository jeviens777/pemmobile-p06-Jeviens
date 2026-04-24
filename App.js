import { Modal, Image } from 'react-native';
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { products } from './data/products';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

export default function App() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(products);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('Semua');
  const [grid, setGrid] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['Semua', 'Pakaian', 'Sepatu', 'Aksesoris'];

  const handleSearch = (text) => {
    setSearch(text);
    filterData(text, category);
     filterData(text, category, sortType);
  };

  const filterData = (text, cat, sort = sortType) => {
    let data = products;
    // SORT
if (sort === 'low') {
  data.sort((a, b) => a.price - b.price);
} else if (sort === 'high') {
  data.sort((a, b) => b.price - a.price);
} else if (sort === 'rating') {
  data.sort((a, b) => b.rating - a.rating);
}

    if (cat !== 'Semua') {
      data = data.filter((item) => item.category === cat);
    }

    if (text) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    setFiltered(data);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    filterData(search, cat);
     filterData(search, cat, sortType);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFiltered(products);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        ShopList ({filtered.length} produk)
      </Text>

      <SearchBar
        value={search}
        onChange={handleSearch}
        onClear={() => handleSearch('')}
      />

      {/* FILTER CATEGORY */}
      <View style={styles.filterContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.chip,
              category === cat && styles.activeChip,
            ]}
            onPress={() => handleCategory(cat)}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TOGGLE VIEW */}
      {/* SORT */}
<View style={styles.sortContainer}>
  
  <TouchableOpacity
    style={styles.chip}
    onPress={() => {
      setSortType('low');
      filterData(search, category, 'low');
    }}
  >
    <Text>Harga ↓</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.chip}
    onPress={() => {
      setSortType('high');
      filterData(search, category, 'high');
    }}
  >
    <Text>Harga ↑</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.chip}
    onPress={() => {
      setSortType('rating');
      filterData(search, category, 'rating');
    }}
  >
    <Text>Rating ⭐</Text>
  </TouchableOpacity>

</View>
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setGrid(!grid)}
      >
        <Text>{grid ? 'List View' : 'Grid View'}</Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        key={grid ? 'grid' : 'list'}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
  <ProductCard 
  item={item} 
  onPress={setSelectedProduct} 
  grid={grid} 
/>
)}
        numColumns={grid ? 2 : 1}
        columnWrapperStyle={
  grid ? { justifyContent: 'space-between' } : null
}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>😢</Text>
            <Text>Tidak ada produk ditemukan</Text>
            <Text>Coba kata kunci lain</Text>
          </View>
        }
        />
     <Modal visible={selectedProduct !== null} transparent={true}>
  <View style={styles.modalContainer}>

    {selectedProduct && (
      <View>
        <Image
          source={selectedProduct.image}
          style={styles.modalImage}
        />

        <Text style={styles.modalText}>
          {selectedProduct.name}
        </Text>

        <TouchableOpacity
          onPress={() => setSelectedProduct(null)}
        >
          <Text style={styles.close}>Tutup</Text>
        </TouchableOpacity>
      </View>
    )}

  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
modalContainer: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalImage: {
  width: 250,
  height: 250,
  borderRadius: 10,
  backgroundColor: '#fff',
},

modalText: {
  color: '#ffffff',
  marginTop: 10,
  fontSize: 16,
},

close: {
  color: 'red',
  marginTop: 10,
},

  container: {
    flex: 1,
    backgroundColor: '#f69a9a',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  chip: {
    padding: 8,
    backgroundColor: '#ffb2d6',
    borderRadius: 20,
    marginRight: 5,
  },
  activeChip: {
    backgroundColor: '#f1d9e2',
  },
  toggle: {
    margin: 10,
    alignSelf: 'flex-end',
  },
  empty: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 40,
  },
  sortContainer: {
  flexDirection: 'row',
  marginHorizontal: 10,
  marginBottom: 10,
},
});