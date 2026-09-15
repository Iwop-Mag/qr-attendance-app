import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getAttendanceBySession } from '../db/attendanceRepo';
import type { AttendanceRecord } from '../db/types';

export default function AttendanceListScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    if (sessionId) {
      getAttendanceBySession(Number(sessionId)).then(setRecords);
    }
  }, [sessionId]);

  return (
    <FlatList
      data={records}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text>{item.id_number}</Text>
          <Text>{item.timestamp}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});