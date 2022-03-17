import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { isRTL } from "expo-localization";
import { COLORS } from "../../assets/colors";

const CompareDateObjects = (date1, date2) => {
  return (
    date1.getDay() == date2.getDay() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
};

const DayItem = ({
  dayNum,
  dayName,
  isSelected = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayWrapper,
        { backgroundColor: isSelected ? COLORS.secondary : COLORS.white },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.dayName,
          { color: isSelected ? COLORS.white : COLORS.lightText },
        ]}
      >
        {dayName}
      </Text>
      <Text
        style={[
          styles.dayNum,
          { color: isSelected ? COLORS.white : COLORS.lightText },
        ]}
      >
        {dayNum}
      </Text>
    </TouchableOpacity>
  );
};

const DatePicker = ({
  labels,
  months,
  onDaySelect,
  selectCurrentDate = false,
  initDate = new Date(),
}) => {
  const [currentDate, setCurrentDate] = useState(initDate);

  const [days, setDays] = useState([
    {
      dayName: labels[0],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      ),
      isSelected: false,
    },
    {
      dayName: labels[1],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 1
      ),
      isSelected: false,
    },
    {
      dayName: labels[2],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 2
      ),
      isSelected: false,
    },
    {
      dayName: labels[3],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 3
      ),
      isSelected: false,
    },
    {
      dayName: labels[4],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 4
      ),
      isSelected: false,
    },
    {
      dayName: labels[5],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 5
      ),
      isSelected: false,
    },
    {
      dayName: labels[6],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 6
      ),
      isSelected: false,
    },
  ]);

  useEffect(() => {
    if (selectCurrentDate) {
      for (let i = 0; i < days.length; i++) {
        if (CompareDateObjects(days[i].date, currentDate)) {
          handleOnDateSelect(i);
          break;
        }
      }
      setCurrentDate(currentDate);
      onDaySelect(currentDate);
    }
  }, []);

  const updateDays = (selectedDate) => {
    for (let i = 0; i < days.length; i++) {
      const startOfWeek = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - selectedDate.getDay()
      );
      startOfWeek.setDate(startOfWeek.getDate() + i);
      days[i].date = startOfWeek;
      days[i].isSelected = false;
    }

    setDays(days);
  };

  const handleOnDateSelect = (index) => {
    for (let i = 0; i < days.length; i++) {
      days[i].isSelected = false;
    }
    days[index].isSelected = true;
    setDays(days);
  };

  const handleOnWeekChange = (num) => {
    currentDate.setDate(currentDate.getDate() + num);
    setCurrentDate(currentDate);
    updateDays(currentDate);
    onDaySelect(null);
  };

  return (
    <View style={styles.continer}>
      <View style={styles.header}>
        <MaterialIcons
          name={isRTL ? "arrow-forward-ios" : "arrow-back-ios"}
          size={20}
          color={COLORS.lightText}
          onPress={() => {
            handleOnWeekChange(-7);
          }}
        />

        <Text style={styles.date}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>

        <MaterialIcons
          name={isRTL ? "arrow-back-ios" : "arrow-forward-ios"}
          size={20}
          color={COLORS.lightText}
          onPress={() => {
            handleOnWeekChange(7);
          }}
        />
      </View>

      <View style={styles.daysItemWrapper}>
        {days.map(({ dayName, date, isSelected }, index) => (
          <DayItem
            dayName={dayName}
            dayNum={date.getDate()}
            key={index.toString()}
            isSelected={isSelected}
            onPress={() => {
              handleOnDateSelect(index);
              setCurrentDate(days[index].date);
              onDaySelect(days[index].date);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: 150,
    alignSelf: "center",
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },
  date: {
    fontSize: 16,
    color: COLORS.lightText,
  },
  daysItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,

    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dayName: {
    fontWeight: "bold",
  },
  dayNum: {
    fontWeight: "bold",
  },
});
export { DatePicker };
