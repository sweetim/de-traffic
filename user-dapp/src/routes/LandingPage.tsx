import { FillButton } from "@/modules/common"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  FC,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"

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
    <div>
      <FillButton onClick={loginClickHandler}>
        <p>Login</p>
      </FillButton>
    </div>
  )
}

export default LandingPage
