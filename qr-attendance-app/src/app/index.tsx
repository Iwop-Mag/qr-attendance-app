import { Text, View, Image, Pressable, StyleSheet } from "react-native";


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
        <Pressable onPress={() => alert("Clicked!")}>
          <Image
            source={require("../../assets/images/functions/table_view_55dp_000_FILL0_wght400_GRAD0_opsz48.png")}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
        <Pressable style={styles.functionsQRContainer} onPress={() => alert("Clicked!")}>
          <Image
            source={require("../../assets/images/functions/qr_code_scanner_55dp_000_FILL0_wght400_GRAD0_opsz48.png")}
            style={{ width: 45, height: 45 }}
          />
        </Pressable>
        <Pressable onPress={() => alert("Clicked!")}>
          <Image
            source={require("../../assets/images/functions/logo_dev_55dp_000_FILL0_wght400_GRAD0_opsz48.png")}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginTop: 100,
    // backgroundColor: "rgba(255, 0, 0, 0.1)",
    height: 70,
  },
  functionsQRContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 1)",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 5,
  },
});
