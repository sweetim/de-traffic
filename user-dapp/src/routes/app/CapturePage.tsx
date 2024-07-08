import { FillButton } from "@/modules/common"
import {
  FC,
  useCallback,
  useRef,
} from "react"
import { useNavigate } from "react-router-dom"
import Webcam from "react-webcam"
import "./CapturePage.css"

const CapturePage: FC = () => {
  const navigate = useNavigate()
  const webcamRef = useRef<Webcam>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)

  const capture = useCallback(() => {
    if (!webcamRef) return
    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot({
      width: 900,
      height: 1200,
    })

    navigate("/app/image-detection", {
      state: {
        image: imageSrc,
      },
    })
  }, [ webcamRef ])

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
