import React, { useState, useCallback, useRef, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, Alert, Image, Switch } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, router } from "expo-router";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { recordScan, startSession } from '../db/attendanceRepo';

export default function QRScanner() {
  const { subjectId, sectionId } = useLocalSearchParams<{ subjectId: string; sectionId: string }>();

  // ALL hooks go here, unconditionally, in the same order every render
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  const snapPoints = React.useMemo(() => ["10%", "50%"], []);

  useEffect(() => {
    if (subjectId && sectionId) {
      startSession(Number(subjectId), Number(sectionId)).then(setSessionId);
    }
  }, [subjectId, sectionId]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" />
    ),
    []
  );

  // handleBarcodeScanned, toggleTorch are plain functions, not hooks — fine to define anywhere,
  // but keep them here for readability
  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    if (!sessionId) {
      Alert.alert("Starting up", "Session isn't ready yet, try again in a moment.", [
        { text: "OK", onPress: () => setScanned(false) },
      ]);
      return;
    }

    try {
      await recordScan(sessionId, data);
      Alert.alert("QR Scanned", data, [
        { text: "Scan next", onPress: () => setScanned(false) },
        { text: "View history", onPress: () => router.push({ pathname: "/history", params: { sessionId: String(sessionId) } }) },
      ]);
    } catch (err) {
      Alert.alert("Error saving scan", String(err));
      setScanned(false);
    }
  };

  const toggleTorch = () => setTorchOn((prev) => !prev);

  // NOW it's safe to branch — all hooks already ran above
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
          style={styles.flashlightIcon}
        />
      </Pressable>

      <BottomSheet 
        ref={bottomSheetRef} 
        index={0} 
        snapPoints={snapPoints} 
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        handleStyle={styles.handleContainer}
        enablePanDownToClose={false}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.content}>
          <Row label="Row one" value={toggle1} onChange={() => setToggle1(!toggle1)} />
          <Row label="Row two" value={toggle2} onChange={() => setToggle2(!toggle2)} />
          <Row label="Row three" value={toggle3} onChange={() => setToggle3(!toggle3)} />

            <Pressable style={styles.floatingButton} onPress={() => router.push({ pathname: "/history", params: { sessionId } })}>
              <Text style={styles.buttonText}>View History</Text>
            </Pressable>

        </BottomSheetView>
      </BottomSheet>

    </View>
  );
}

function Row({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
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
  flashlightIcon: {
    position: "absolute",
    bottom: 10,
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  floatingButton: {
    marginTop: 50,
    alignSelf: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "600" 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 12, 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  label: { 
    fontSize: 16, 
    color: "#333" 
  },
  sheetBackground: {
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: 150,  
  },
  handleContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});