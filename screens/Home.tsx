import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { MenuItemType } from "../components/MenuItem";
import Menu from "../components/Menu";

const menuOptions: MenuItemType[] = [
  {
    icon: "message-circle",
    label: "Messages",
  },
  {
    icon: "activity",
    label: "Trending",
  },
  {
    icon: "bookmark",
    label: "Bookmarks",
  },
  {
    icon: "image",
    label: "Gallery",
    iconBackgroundColor: "#FF6A5F",
  },
  {
    icon: "settings",
    label: "Settings",
  },
  {
    icon: "bell",
    label: "Notifications",
    count: 8,
  },
  {
    icon: "users",
    label: "People",
  },
  {
    image: "https://cdn.mos.cms.futurecdn.net/2oNNWzMiyntgoVjmedmpdn.jpg",
    description: "Visual Designer",
  },
];

function Home() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const PROFILE_ICON_TOP = insets.top + 26;
  const ANIMATION_DURATION = 700;

  const [isExpand, setIsExpand] = useState(false);

  const containerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: isExpand
            ? withTiming(0.7, { duration: ANIMATION_DURATION })
            : withTiming(1, { duration: ANIMATION_DURATION }),
        },
        {
          translateX: isExpand
            ? withTiming((SCREEN_WIDTH - SCREEN_WIDTH * 0.7) / 2, {
                duration: ANIMATION_DURATION,
              })
            : withTiming(0, { duration: ANIMATION_DURATION }),
        },
      ],
      borderRadius: isExpand
        ? withTiming(24, { duration: ANIMATION_DURATION })
        : withTiming(0, { duration: ANIMATION_DURATION }),
    };
  });

  return (
    <View>
      <Menu
        options={menuOptions}
        isExpanded={isExpand}
        onToogleExpand={setIsExpand}
      />
      <Animated.View style={[styles.container, containerAnimation]}>
        <ImageBackground
          source={require("../assets/background.png")}
          style={styles.backgroundImage}
        >
          <Pressable onPress={() => {}}>
            <Image
              source={require("../assets/profile.png")}
              style={[styles.profile, { top: PROFILE_ICON_TOP }]}
            />
          </Pressable>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  backgroundImage: { width: "100%", height: "100%" },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: "absolute",
    right: 24,
  },
});

export default Home;
