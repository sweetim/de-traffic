import { FillButton } from "@/modules/common"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import { Avatar } from "antd"
import {
  FC,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"
import { Illustration } from "../modules/ui/GlowingStars"

const LandingPage: FC = () => {
  const navigate = useNavigate()

  const {
    isConnected,
    connect,
  } = useWeb3Auth()

  useEffect(() => {
    if (isConnected) {
      navigate("/app")
    }
  }, [ isConnected ])

  async function loginClickHandler() {
    await connect()
    navigate("/app")
  }
  return (
    <div className="w-full h-full z-0 relative">
      <Illustration />
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <div className="flex flex-col text-white items-center space-y-6">
          <Avatar size={128} src="/logo.jpg"></Avatar>
          <h1 className="font-bold text-3xl p-2">de-traffic</h1>
          <p>a data and dePIN dapp for annotating traffic light</p>
          <FillButton onClick={loginClickHandler}>
            <p>Login</p>
          </FillButton>
          {/* <ConnectKitButton /> */}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
