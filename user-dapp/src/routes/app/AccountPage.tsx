import FillButton from "@/modules/common/FillButton"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import {
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "wagmi"

export default function AccountPage() {
  const navigate = useNavigate()

  const [ profileImage, setProfileImage ] = useState("")
  // const { walletAddress } = useWalletAddress()
  const { address: walletAddress } = useAccount()

  const {
    logout,
    userInfo,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (userInfo && userInfo.profileImage) {
        setProfileImage(userInfo.profileImage)
      }
    })()
  })

  async function logoutClickHandler() {
    await logout()
    navigate("/")
  }

  return (
    <div className="w-full text-center mt-20">
      <Space direction="vertical" size="large" align="center">
        <Avatar size={128} src={profileImage} />
        <Paragraph style={{ width: 300, color: "white" }} ellipsis copyable className="font-bold">
          {walletAddress && walletAddress.toString()}
        </Paragraph>
        <FillButton onClick={logoutClickHandler}>
          <p>LOGOUT</p>
        </FillButton>
      </Space>
    </div>
  )
}
