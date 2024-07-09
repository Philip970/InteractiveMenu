import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export type MenuItemType = {
  icon?: string;
  label?: string;
  image?: string;
  description?: string;
  count?: number;
  iconBackgroundColor?: string;
};

type Props = MenuItemType & {
  index: number;
  isExpanded: boolean;
  onPress?: () => void;
};

function MenuItem({
  icon,
  label,
  image,
  index,
  isExpanded,
  description,
  iconBackgroundColor = "#FFF",
  count,
  onPress,
}: Props) {
  const COLLAPSED_TOP = 0;
  const MENU_ITEM_HEIGHT = 68;
  const ANIMATION_DURATION = 700;
  const EXPANDED_TOP = MENU_ITEM_HEIGHT * index + MENU_ITEM_HEIGHT;

  const topAnimation = useAnimatedStyle(() => {
    return {
      top: withTiming(isExpanded ? EXPANDED_TOP : COLLAPSED_TOP, {
        duration: ANIMATION_DURATION,
      }),
    };
  });

  return (
    <Animated.View
      onTouchEnd={onPress}
      style={[
        styles.container,
        {
          height: MENU_ITEM_HEIGHT,
          top: MENU_ITEM_HEIGHT * index,
        },

        topAnimation,
      ]}
    >
      {icon && (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconBackgroundColor },
          ]}
        >
          <Feather name={icon} size={24} color="#292D32" />
        </View>
      )}
      {label && <Text style={styles.label}>{label}</Text>}
      {count && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {description && <Text style={styles.description}>{description}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginLeft: 16,
    width: "100%",
    backgroundColor: "#EBEBE6",
  },
  iconContainer: {
    width: 56,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  label: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  countContainer: {
    marginLeft: 32,
    backgroundColor: "#252F2C",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  image: {
    width: 56,
    height: 48,
    borderRadius: 12,
  },
  description: {
    color: "#576677",
    alignSelf: "flex-end",
    marginLeft: 16,
  },
  countText: {
    fontWeight: "500",
    color: "white",
  },
});

export default MenuItem;
