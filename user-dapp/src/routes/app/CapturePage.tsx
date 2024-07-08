import { FillButton } from "@/modules/common"
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import Webcam from "react-webcam"
import "./CapturePage.css"

const CapturePage: FC = () => {
  const navigate = useNavigate()
  const webcamRef = useRef<Webcam>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)

  const [ width, setWidth ] = useState(0)
  const [ height, setHeight ] = useState(0)

  const capture = useCallback(() => {
    if (!webcamRef) return
    if (!webcamRef.current) return
    console.log("capture dimension", width, height)
    const imageSrc = webcamRef.current.getScreenshot()

    navigate("/app/image-detection", {
      state: {
        image: imageSrc,
        width,
        height,
      },
    })
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
      />
      <div className="absolute flex flex-row justify-center mb-5 w-full bottom-0">
        <FillButton onClick={capture}>
          <p>Capture</p>
        </FillButton>
      </div>
    </div>
  )
}

export default CapturePage
