// PaymentReceipt.js
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Picture from "../UI/Picture";
import colorScheme from "../../constants/colorScheme";
import MenuButton from "../Buttons/MenuButton";

const PaymentReceipt = ({
  playerName,
  player,
  amount,
  paymentDate,
  paymentType,
  monthlyPayments,
  collectedBy,
  collectedByName,
  createdAt,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Player Name</Text>
          <Text style={styles.title}>{playerName}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Amount</Text>
          <Text style={styles.title}>{amount}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Payment Date</Text>
          <Text style={styles.title}>
            {new Date(paymentDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Payment Type</Text>
          <Text style={styles.title}>{paymentType}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Collected By</Text>
          <Text style={styles.title}>{collectedByName}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Created At</Text>
          <Text style={styles.title}>
            {new Date(createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <MenuButton style={styles.menuButton} color={colorScheme.grey} />
    </View>
  );
};

export default PaymentReceipt;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    overflow: "visible",
    width: 320,
    padding: 15,
  },
  image: {
    paddingRight: 15,
  },
  info: {
    flex: 1,
    height: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    gap: 1,
  },
  item: {
    marginBottom: 5,
  },
  title: {
    color: colorScheme.black,
    fontSize: 20,
    fontFamily: "Condensed-Black",
  },
  subTitle: {
    color: colorScheme.grey,
    fontSize: 16,
    fontFamily: "Condensed-Light",
  },
  menuButton: {
    position: "absolute",
    right: 4,
    top: 11,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    gap: 30,
  },
});
