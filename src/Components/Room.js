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
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircularProgress from "@mui/material/CircularProgress";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamTwoToneIcon from "@mui/icons-material/VideocamTwoTone";
import VideocamOffTwoToneIcon from "@mui/icons-material/VideocamOffTwoTone";
import Button from "@mui/material/Button";

const Room = ({ roomId, isHost }) => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isRecordingOn, setIsRecordingOff] = useState(false);
  const [value, setValue] = useState("recents");
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);

  const { initialize, isInitialized } = useHuddle01();
  const [isPeerInitialized, setIsPeerInitialized] = useState(false);
  const { joinLobby } = useLobby();
  const [isPeerJoinedLobby, setIsPeerJoinedLobby] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const showAlert = () => {
    if (isVisible) {
      // if the alert is visible return
      return;
    }
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2500); // hide the alert after 2.5s
  };

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

  const handleVideoClick = () => {
    setIsVideoOn(!isVideoOn);
    if (!isVideoOn && produceVideo.isCallable) {
      produceVideo(camStream);
    } else if (stopProducingVideo.isCallable) {
      stopProducingVideo();
    }
  };

  const handleMicClick = async () => {
    if (!isMicOn && produceAudio.isCallable) produceAudio(micStream);
    else if (stopProducingVideo.isCallable) stopProducingAudio();
    setIsMicOn(!isMicOn);
  };

  const handleRecordClick = () => {
    setIsRecordingOff(!isRecordingOn);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
    setIsPeerInitialized(true);
  }, []);

  const fetchStreams = async () => {
    if (fetchAudioStream.isCallable && fetchVideoStream.isCallable) {
      try {
        fetchVideoStream();
        fetchAudioStream();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isPeerInitialized) {
        try {
          joinLobby(roomId);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [isPeerInitialized, roomId]);

  useEffect(() => {
    if (!joinLobby.isCallable) {
      fetchStreams();
    }
  }, [
    joinLobby.isCallable,
    fetchAudioStream.isCallable,
    fetchVideoStream.isCallable,
  ]);

  useEffect(() => {
    if (
      stopVideoStream.isCallable &&
      joinRoom.isCallable &&
      stopAudioStream.isCallable
    ) {
      joinRoom();
    }
  }, [
    stopVideoStream.isCallable,
    joinRoom.isCallable,
    stopAudioStream.isCallable,
  ]);

  useEffect(() => {
    if (leaveRoom.isCallable && produceVideo.isCallable) {
      showAlert();
      setIsJoinedRoom(true);
    }
  }, [leaveRoom.isCallable, produceVideo.isCallable]);

  const videoRef = useRef(null);

  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });
  if (inProgress)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      {console.log(isHost)}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: "0.5rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "0.25rem",
          padding: "2rem",
          background: "hsl(215, 32%, 27%)",
          color: "white",
          boxShadow: "0 5px 10px -5px rgba(0, 0, 0, 0.5)",
          transition: "all 0.2s ease-in-out",
          opacity: 0,
          transform: "translateY(1.25rem)",
          ...(isVisible && {
            opacity: 1,
            transform: "translateY(0)",
          }),
        }}
      >
        You have joined the room
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "10px",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ display: isVideoOn ? "block" : "none" }}
        ></video>
        <div>
          {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <Video
                key={peer.peerId}
                peerId={peer.peerId}
                track={peer.cam}
                // debug
              />
            ))}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio
                key={peer.peerId}
                peerId={peer.peerId}
                track={peer.mic}
                // debug
              />
            ))}
        </div>
      </div>
      {isJoinedRoom && isHost ? (
        <div>
          <Button
            variant="text"
            style={{
              position: "fixed",
              bottom: "60px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Joined as Co-Host
          </Button>
          <BottomNavigation
            sx={{
              width: 500,
              margin: "auto",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "hsl(216, 50%, 16%)",
              zIndex: 999,
            }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              onClick={handleVideoClick}
              icon={
                <VideocamTwoToneIcon
                  label="Video-On"
                  value="video-on"
                  style={{
                    color: "#1976d2",
                    backgroundColor: isVideoOn ? "" : "#ff726f",
                    fontSize: "25px",
                    borderRadius: "5px",
                  }}
                />
              }
            />

            <BottomNavigationAction
              onClick={handleMicClick}
              icon={
                <MicIcon
                  label="Mic-On"
                  value="mic-on"
                  style={{
                    color: "#1976d2",
                    backgroundColor: isMicOn ? "" : "#ff726f",
                    fontSize: "25px",
                    borderRadius: "5px",
                  }}
                />
              }
            />
            <BottomNavigationAction
              onClick={handleRecordClick}
              disabled={!leaveRoom.isCallable}
              icon={
                isRecordingOn ? (
                  <RadioButtonCheckedIcon
                    label="Recording-On"
                    value="recording-on"
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    label="Recording-Off"
                    value="recording-off"
                  />
                )
              }
            />
          </BottomNavigation>
        </div>
      ) : (
        <Button
          variant="text"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Joined as Viewer
        </Button>
      )}
    </div>
  );
};

export default Room;
