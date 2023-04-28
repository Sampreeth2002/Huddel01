import { useEventListener, useHuddle01 } from "@huddle01/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecorder } from "@huddle01/react/app-utils";
import {
  useLobby,
  useAudio,
  useVideo,
  useRoom,
  useMeetingMachine,
  usePeers,
  useRecording,
} from "@huddle01/react/hooks";
import { Video, Audio } from "@huddle01/react/components";

const Record = () => {
  // roomId logic
  const [roomId, setRoomId] = useState("");
  const { roomIdFromUrl } = useParams();

  const { peerIds, peers } = usePeers();
  // refs
  const videoRef = useRef(null);
  const { state } = useMeetingMachine();
  const { stream: camStream, fetchVideoStream, produceVideo } = useVideo();
  const { joinLobby, isLobbyJoined } = useLobby();
  const { joinRoom } = useRoom();
  const {
    startRecording,
    stopRecording,
    error,
    data: recordingData,
    inProgress,
  } = useRecording();

  useEffect(() => {
    setRoomId(roomIdFromUrl);
  }, [roomIdFromUrl]);

  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  useRecorder(roomId, "KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");

  return (
    <main>
      <div>
        <p>
          Room ID:&nbsp;
          <code>{roomId}</code>
        </p>
        <div>{JSON.stringify(state.value)}</div>
        <div>
          <div>
            {/* <Image
              src="https://huddle01-assets-frontend.s3.amazonaws.com/Logo/community.png"
              alt="Vercel Logo"
              width={250}
              height={100}
              priority
            /> */}
          </div>
        </div>
      </div>

      {/* Me Video */}
      <div>
        <div>
          {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <div key={peer.peerId}>
                <Video peerId={peer.peerId} track={peer.cam} debug />
              </div>
            ))}
        </div>
        {Object.values(peers)
          .filter((peer) => peer.mic)
          .map((peer) => (
            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
          ))}
      </div>

      {/* Buttons */}
      <div></div>
    </main>
  );
};

export default Record;
