import { FillButton } from "@/modules/common"
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import Webcam from "react-webcam"

const Capture: FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)

  const [ width, setWidth ] = useState(0)
  const [ height, setHeight ] = useState(0)

  const capture = useCallback(() => {
    if (!webcamRef) return
    if (!webcamRef.current) return

    // const imageSrc = webcamRef.current.getScreenshot()
  }, [ webcamRef ])

  useEffect(() => {
    if (!videoContainerRef) return
    if (!videoContainerRef.current) return

    setHeight(videoContainerRef.current.clientHeight)
    setWidth(videoContainerRef.current.clientWidth)
  }, [ videoContainerRef ])

  return (
    <div ref={videoContainerRef} className="w-full h-full relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width,
          height,
        }}
      />
      <div className="absolute bottom-3 left-1/3">
        <FillButton onClick={capture}>
          <p>Capture</p>
        </FillButton>
      </div>
    </div>
  )
}

export default Capture
