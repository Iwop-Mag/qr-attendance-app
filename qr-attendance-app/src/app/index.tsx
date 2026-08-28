import { Text, View, StyleSheet } from "react-native";


export default function Index() {
  return (
    <View style={styles.appWrapper}>
      <View style={styles.headContainer}>
        <Text style={styles.subHeader}>Hello!</Text>
        <Text style={styles.header}>BSECE - 1C</Text>
      </View>
      <View style={styles.dashboardContainer}>
        <Text>Dashboard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    padding: 25,
  },
  headContainer: {
    marginBottom: 50,
  },
  subHeader: {
    fontSize: 30,
    fontWeight: "400",
    marginBottom: -25,
  },
  header: {
    fontSize: 50,
    fontWeight: "900",
  },
  dashboardContainer: {
  },
});
