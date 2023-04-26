import { useEventListener, useHuddle01 } from "@huddle01/react";
import {
  useLobby,
  useAudio,
  useVideo,
  useRoom,
  useMeetingMachine,
  usePeers,
  useRecording,
} from "@huddle01/react/hooks";
import { useState, useEffect, useRef } from "react";
import { Video, Audio } from "@huddle01/react/components";
// const {
//   startRecording,
//   stoprecording,
//   isStarting,
//   inProgress,
//   isStopping,
//   error,
// } = useRecording();

const Room = ({ roomId }) => {
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    startRecording,
    stopRecording,
    isStarting,
    inProgress,
    isStopping,
    error: recordingError,
  } = useRecording();
  const { state } = useMeetingMachine();
  const {
    fetchAudioStream,
    stopAudioStream,
    error: micError,
    produceAudio,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    stopVideoStream,
    error: camError,
    produceVideo,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  const { peerIds, peers } = usePeers();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
  }, []);

  const videoRef = useRef(null);

  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });
  if (inProgress) return <div>...loading</div>;
  return (
    <div>
      <h2 className="text-2xl">App State</h2>
      <h3>{JSON.stringify(state.value)}</h3>
      {isInitialized ? "Hello World!" : "Please initialize"}
      <button
        disabled={!joinLobby.isCallable}
        onClick={() => joinLobby(roomId)}
      >
        Join Lobby
      </button>

      {/* Mic */}
      <button
        disabled={!fetchAudioStream.isCallable}
        onClick={fetchAudioStream}
      >
        FETCH_AUDIO_STREAM
      </button>

      {/* Webcam */}
      <button
        disabled={!fetchVideoStream.isCallable}
        onClick={fetchVideoStream}
      >
        FETCH_VIDEO_STREAM
      </button>

      <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
        JOIN_ROOM
      </button>

      <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
        LEAVE_ROOM
      </button>

      <button
        disabled={!produceVideo.isCallable}
        onClick={() => produceVideo(camStream)}
      >
        Produce Cam
      </button>

      <button
        disabled={!produceAudio.isCallable}
        onClick={() => produceAudio(micStream)}
      >
        Produce Mic
      </button>

      <button
        disabled={!stopProducingVideo.isCallable}
        onClick={stopProducingVideo}
      >
        Stop Producing Cam
      </button>

      <button
        disabled={!stopProducingAudio.isCallable}
        onClick={stopProducingAudio}
      >
        Stop Producing Mic
      </button>

      <button
        disabled={!startRecording.isCallable}
        onClick={() => {
          console.log(`http://localhost:3001/`);
          startRecording(`http://localhost:3001/`);
        }}
      >
        START_RECORDING
      </button>

      {isStarting ? "Recording is starting" : recordingError}

      <div>
        <button disabled={!stopRecording.isCallable} onClick={stopRecording}>
          STOP_RECORDING
        </button>
      </div>

      <video ref={videoRef} autoPlay muted></video>
      <div className="grid grid-cols-4">
        {Object.values(peers)
          .filter((peer) => peer.cam)
          .map((peer) => (
            <Video
              key={peer.peerId}
              peerId={peer.peerId}
              track={peer.cam}
              debug
            />
          ))}
        {Object.values(peers)
          .filter((peer) => peer.mic)
          .map((peer) => (
            <Audio
              key={peer.peerId}
              peerId={peer.peerId}
              track={peer.mic}
              debug
            />
          ))}
      </div>
    </div>
  );
};

export default Room;
