import { Text, View, StyleSheet } from "react-native";


export default function Index() {
  return (
    <View style={styles.appWrapper}>
      <View style={styles.headContainer}>
        <Text style={styles.subHeader}>Hello!</Text>
        <Text style={styles.header}>BSECE - 1C</Text>
      </View>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardItemMain}></View>
        <View style={styles.dashboardItemChildContainer}>
          <View style={styles.dashboardItemChild}></View>
          <View style={styles.dashboardItemChild}></View>
        </View>
      </View>
      <View style={styles.functionsContainer}>

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
    marginTop: 40,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: -15,
    opacity: 0.8,
  },
  header: {
    fontSize: 50,
    fontWeight: "900",
  },
  dashboardContainer: {
  },
  dashboardItemMain: {
    backgroundColor: "rgba(255, 0, 0, 0.4)",
    height: 200,
    width: "100%",
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 10,
  },
  dashboardItemChildContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dashboardItemChild: {
    backgroundColor: "rgba(255, 0, 0, 0.4)",
    height: 150,
    width: "48%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 10,
  },
  functionsContainer: {
    marginTop: 100,
    backgroundColor: "rgba(255, 0, 0, 0.4)",
    height: 70,
  },
});
