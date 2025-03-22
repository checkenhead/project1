import { useEffect, useRef, useState } from 'react'
import { ENV } from '@/util/constance/env'

const VideoChat = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
        {
          urls: 'stun:stun3.l.google.com:19302',
        },
      ],
    })
  )
  const conn = useRef(new WebSocket(ENV.SIGNALING_URL))

  useEffect(() => {
    // 내가 나의 캔디데이트(너가 나를 연결하는 방법들의 후보)를 등록하면(즉 로컬디스크립션을 설정하면)
    // 트리거 되는 메서드에요
    peerConnection.current.onicecandidate = function (event) {
      console.log('나의 캔디데이트를 보낼게요')
      send({
        event: 'candidate',
        data: event.candidate,
      })
    }
    // 연결이 되서 피어의 스트림이 내 RTC객체에 등록되면 시작되는 메서드에요
    peerConnection.current.addEventListener('track', handleAddStream)

    // 소켓이 연결되었을 때 실행할 콜백함수에요
    conn.current.onopen = function () {
      console.log('웹소켓이 연결되었어요')
    }

    // 소켓에서 메세지를 받아왔을 때 실행할 콜백함수에요
    conn.current.onmessage = async function (msg) {
      const content = JSON.parse(msg.data)
      if (content.event == 'offer') {
        console.log('오퍼가 왔어요')
        // 오퍼가 오면 가장먼저 그 오퍼를 리모트 디스크립션으로 등록해줘요
        const offer = content.data
        await peerConnection.current.setRemoteDescription(offer)
        // 받는 쪽에서도 자신의 미디어를 켜줘요
        await getMedia()
        // myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream))
        // 이제 앤서를 보내요
        const answer = await peerConnection.current.createAnswer()
        await peerConnection.current.setLocalDescription(answer)
        console.log('앤서를 보낼게요')
        send({
          event: 'answer',
          data: answer,
        })
      } else if (content.event == 'answer') {
        console.log('앤서가 왔어요')
        const answer = content.data
        await peerConnection.current.setRemoteDescription(answer)
      } else if (content.event == 'candidate') {
        console.log('캔디데이트가 왔어요')
        // 이 메서드를 통해 리모트 디스크립션에 설정되어있는 피어와의 연결방식을 결정해요
        await peerConnection.current.addIceCandidate(content.data)
      }
    }
  }, [])
  // 앞으로 소켓으로 메세지를 보낼 땐 이 함수를 쓸 생각이에요
  function send(message: any) {
    conn.current.send(JSON.stringify(message))
  }

  //미디어 내용을 받기 시작하는 함수에요
  async function getMedia() {
    if (!localVideoRef.current) return
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
    localVideoRef.current.srcObject = stream
    stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream))
  }

  function handleAddStream(data: any) {
    console.log('스트리밍 데이터를 받아왔어요')
    if (!remoteVideoRef.current || !data.streams[0]) return
    remoteVideoRef.current.srcObject = data.streams[0]
  }

  // '오퍼를 생성해요'라는 버튼을 눌렀을 때 이 메서드가 실행되요
  async function createOffer() {
    console.log('오퍼를 보내볼게요')

    //일단 카메라를 킬게요 키면서 myStream에도 미디어 정보를 담아와요
    await getMedia()

    // getMedia에서 가져온 audio, video 트랙을 myPeerConnection에 등록해요
    // myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream))

    // RTC객체도 만들었고 나의 미디어도 RTC객체에 담았으니 오퍼를 생성해볼게요
    const offer = await peerConnection.current.createOffer()
    console.log('오퍼를 전송시작해요!')
    // 이제 send함수를 통해 소켓으로 나의 offer를 전송해 볼게요
    send({
      event: 'offer',
      data: offer,
    })
    console.log('오퍼 전송을 완료했어요')
    await peerConnection.current.setLocalDescription(offer)
  }

  return (
    <>
      <button
        onClick={() => {
          createOffer()
        }}
      >
        오퍼를 생성해요
      </button>
      <br />
      <div>내 영상이에요</div>
      <video ref={localVideoRef} playsInline autoPlay width='300' height='300'></video>
      <br />
      <div>피어의 영상이에요</div>
      <video ref={remoteVideoRef} playsInline autoPlay width='300' height='300'></video>
    </>
  )
}

export default VideoChat
