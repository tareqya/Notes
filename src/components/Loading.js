import React from "react";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const animation = Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(animation).start();
  }

  render() {
    return (
      <LottieView
        style={{
          width: "100%",
        }}
        source={require("../../assets/files/loading.json")}
        progress={this.state.progress}
      />
    );
  }
}

export { Loading };
