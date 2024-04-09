import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';

//export default function TabOneScreen() {
  
type Data = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  pathImage: string;
  user_created: number,
  date_begin: string,
  date_end: string,
  is_published: number,
  updated_at: string
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('https://acc0-2a02-8428-ed77-e101-54ba-6f5b-710d-95e9.ngrok-free.app/api/plants');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
    <EditScreenInfo path="app/(tabs)/index.tsx" />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            
            <Text>
              {item.name}, {item.description}, {item.created_at}, {item.pathImage}, {item.updated_at}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
  /*return (
    
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
