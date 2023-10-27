import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import styles from "./styles";
import Header from "../../components/Header";
import MessageInput, {
  IMessageInputRefProps,
} from "../../components/MessageInput";
import socket from "../../Hooks/useSocket";
import uuid from "react-native-uuid";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { IMessageLabelRefProps } from "../../components/MessageLabel";
import MessageLabel from "../../components/MessageLabel";
import { useAuth } from "../../contexts/auth";
import AnswerLabel from "../../components/AnswerLabel";
import ScrollToBottomButton from "../../components/ScrollToBottomButton";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Chat: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const simultaneousRef = useRef<IMessageLabelRefProps>(null);
  const messageRef = useRef({ value: "" });
  const messageInputRef = useRef<IMessageInputRefProps>(null);
  const [messages, setMessages] = useState<Object[]>([]);
  const { userName } = useAuth();
  const [answer, setAnswer] = useState({
    visible: false,
    data: { name: "", message: "" },
  });
  const [scrollToBottom, setScrollToBottom] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      Keyboard.dismiss();
    }, [])
  );

  useEffect(() => {
    const handleRealtimeChat = (message: string) => {
      console.log(message);
      setMessages((prevState) => [...prevState, message]);
      if (messages.length > 5)
        flatListRef.current?.scrollToIndex({ index: messages.length - 1 });
    };

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("realtime-chat", handleRealtimeChat);

    return () => {
      socket.disconnect();
      console.log("disconnected");
    };
  }, []);

  const handleSendMessage = async () => {
    let fullMessage = {
      _id: uuid.v4().toString(),
      message: messageRef.current.value,
      created_at: new Date(),
      sendedBy: userName.id,
    };

    socket.emit("chat-message", fullMessage);
    messageInputRef.current?.clearText();
    if (messages.length > 5)
      flatListRef.current?.scrollToIndex({ index: messages.length - 1 });
  };

  const handleScrollToBottom = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (
      event.nativeEvent.contentOffset.y <
      event.nativeEvent.contentSize.height - SCREEN_HEIGHT
    ) {
      setScrollToBottom(true);
    } else {
      setScrollToBottom(false);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <MessageLabel
        onAnswerPress={() => {
          setAnswer({
            visible: true,
            data: { name: item.sendedBy, message: item.message },
          });
          messageInputRef.current?.openKeyboard();
          flatListRef.current?.scrollToIndex({ index: messages.length - 1 });
        }}
        ref={simultaneousRef}
        message={item.message}
        sendedBy={item.sendedBy}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Header />
        <View></View>
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            style={styles.messagesContainer}
            data={messages}
            onScroll={(event) => handleScrollToBottom(event)}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 100,
            }}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
        {scrollToBottom && (
          <ScrollToBottomButton
            onPress={() => flatListRef.current?.scrollToEnd()}
          />
        )}
        {answer.visible && (
          <AnswerLabel
            message={answer.data.message}
            name={answer.data.name}
            onClosePress={() => {
              setAnswer({ visible: false, data: { name: "", message: "" } });
            }}
          />
        )}
        <MessageInput
          ref={messageInputRef}
          onChange={(text) => (messageRef.current.value = text)}
          onPress={handleSendMessage}
        />
      </View>
    </>
  );
};

export default Chat;
