import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

import { StreamChat } from 'stream-chat';
import { useEffect, useState } from 'react';
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  useMessageInputContext,
} from 'stream-chat-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const client = StreamChat.getInstance('XXX');

export default function App() {
  const [channel, setChannel] = useState();
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    client.connectUser(
      {
        id: 'XXX',
      },
'XXX'    );

    setIsClientReady(true);
  }, []);

  const filter = {
    type: 'support', members: { $in: ['XXX'] }
  };

  if (!isClientReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 100 }}>
      <OverlayProvider>
        <Chat client={client} enableOfflineSupport>
        {channel ?
          <Channel
            channel={channel}
            enableOfflineSupport
          >
            <MessageList />
            <MessageInput />
          </Channel>
          : <ChannelList filters={filter} onSelect={setChannel} />
        }
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
