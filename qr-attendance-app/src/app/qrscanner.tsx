import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function QRScanner() {
  const [torchOn, setTorchOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View style={styles.container}><Text>Loading camera permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 12 }}>We need camera access to scan QR codes.</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("QR Scanned", data, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  const toggleTorch = () => setTorchOn((prev) => !prev);

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={styles.cameraView}
        facing="back"
        enableTorch={torchOn}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      <Pressable style={styles.flashlight} onPress={toggleTorch}>
        <Image
          source={torchOn ? require("../../assets/images/functions/flashlight_off_64dp_000_FILL0_wght200_GRAD0_opsz48.png") : require("../../assets/images/functions/flashlight_on_64dp_000_FILL0_wght200_GRAD0_opsz48.png")}
          style={{ width: 50, height: 50, alignSelf: "center" }}
        />
      </Pressable>
      <Pressable style={styles.floatingButton} onPress={() => router.push("/history")}>
        <Text style={styles.buttonText}>View History</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  cameraView: {
    position: "absolute",
    top: 200,
    width: 280,
    height: 280,
    alignSelf: "center",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  flashlight: {
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,

    borderRadius: 80,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 1.5)",
  },
  button: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  floatingButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});