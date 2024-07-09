import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { MenuItemType } from "./MenuItem";
import MenuList from "./MenuList";

type Props = {
  options: MenuItemType[];
  isExpanded: boolean;
  onToogleExpand: (isExpanded: boolean) => void;
};

const Menu = ({ options, isExpanded, onToogleExpand }: Props) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const MENU_HEIGHT = 68;
  const ANIMATION_DELAY = 500;
  const ANIMATION_DURATION = 700;
  const MENU_WIDTH = SCREEN_WIDTH - 120;
  const MENU_TOP = insets.top + 16;
  const TRANSLATE_WIDTH = -48; // BOTTON_WIDTH(32) +  SPACING(16)
  const SEARCH_WIDTH = MENU_WIDTH - 80; // MENU_WIDTH - (2 * BOTTON_WIDTH(32) +  SPACING(16))

  const containerAnimation = useAnimatedStyle(() => {
    return {
      height: isExpanded
        ? withTiming(SCREEN_HEIGHT - MENU_HEIGHT, {
            duration: ANIMATION_DURATION,
          })
        : withTiming(MENU_HEIGHT, { duration: ANIMATION_DURATION }),
    };
  });

  const sliderAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isExpanded ? TRANSLATE_WIDTH : 0, {
            duration: ANIMATION_DURATION,
          }),
        },
      ],
    };
  });

  const expandButtonAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(ANIMATION_DELAY, withSpring(isExpanded ? 0 : 1)),
        },
      ],
    };
  });

  const closeButtonAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(ANIMATION_DELAY, withSpring(isExpanded ? 1 : 0)),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { width: MENU_WIDTH, height: MENU_HEIGHT },
        { top: MENU_TOP },
        containerAnimation,
      ]}
    >
      <Animated.View style={[styles.slidingContainer, sliderAnimation]}>
        <Pressable onPress={() => onToogleExpand(!isExpanded)}>
          <Animated.View style={[styles.button, expandButtonAnimation]}>
            <Feather name="more-horizontal" size={20} color="#292D32" />
          </Animated.View>
        </Pressable>
        <View style={[styles.searchContainer, { width: SEARCH_WIDTH }]}>
          <Feather name="search" size={24} color="#576677" />
          <Text style={styles.searchText}>Search ...</Text>
        </View>
        <Pressable onPress={() => onToogleExpand(!isExpanded)}>
          <Animated.View style={[styles.button, closeButtonAnimation]}>
            <Feather name="x" size={20} color="#292D32" />
          </Animated.View>
        </Pressable>
      </Animated.View>

      <MenuList options={options} isExpanded={isExpanded} />
    </Animated.View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#EBEBE6",
    borderRadius: 32,
    alignSelf: "center",
    overflow: "hidden",
    zIndex: 10,
    left: 24,
  },
  button: {
    backgroundColor: "#c0c0c0",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  slidingContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#EBEBE6",
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingLeft: 16,
    height: 48,
    marginHorizontal: 16,
    borderRadius: 32,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#576677",
  },
});
