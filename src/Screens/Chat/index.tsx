import React, { useEffect, useRef, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import styles from "./styles";
import Header from "../../components/Header";
import MessageInput, {
  IMessageInputRefProps,
} from "../../components/MessageInput";
import socket from "../../Hooks/useSocket";
import uuid from "react-native-uuid";
import { useRoute } from "@react-navigation/native";
import MessageLabel, {
  IMessageLabelRefProps,
} from "../../components/MessageLabel";
import { useAuth } from "../../contexts/auth";

const Chat: React.FC = () => {
  const simultaneousRef = useRef<IMessageLabelRefProps>(null);
  const messageRef = useRef({ value: "" });
  const messageInputRef = useRef<IMessageInputRefProps>(null);
  const [messages, setMessages] = useState<Object[]>([]);
  const { userName } = useAuth();

  useEffect(() => {
    Keyboard.dismiss();
    console.log(userName, "USERNAME");
  }, []);

  useEffect(() => {
    const handleRealtimeChat = (message: string) => {
      console.log(message);
      setMessages((prevState) => [...prevState, message]);
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

  const handleSendMessage = () => {
    let fullMessage = {
      id: uuid.v4(),
      message: messageRef.current.value,
      name: userName.name,
      senderId: userName.id,
    };
    socket.emit("chat-message", fullMessage);
    messageInputRef.current?.clearText();
  };

  const renderItem = ({ item }: any) => {
    return (
      <MessageLabel
        ref={simultaneousRef}
        message={item.message}
        senderId={item.senderId}
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
            simultaneousHandlers={simultaneousRef}
            style={styles.messagesContainer}
            data={messages}
            contentContainerStyle={{ marginTop: 10, paddingBottom: 100 }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
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
