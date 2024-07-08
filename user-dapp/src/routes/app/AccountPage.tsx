import { useWalletInfo } from "@/hooks/useWalletInfo"
import FillButton from "@/modules/common/FillButton"
import { User } from "@phosphor-icons/react"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import { useNavigate } from "react-router-dom"
import {
  match,
  P,
} from "ts-pattern"

export default function AccountPage() {
  const navigate = useNavigate()
  const { logout } = useWeb3Auth()
  const { walletAddress, userInfo } = useWalletInfo()

  async function logoutClickHandler() {
    await logout()
    navigate("/")
  }

  const avatar = match(!userInfo?.profileImage)
    .with(P.string, () => <Avatar size={128} src={userInfo?.profileImage} />)
    .otherwise(() => <User size={128} color="#ffebeb" weight="fill" />)

  return (
    <div className="w-full text-center mt-20">
      <Space direction="vertical" size="large" align="center">
        {avatar}
        <Paragraph
          style={{ width: 300, color: "white" }}
          ellipsis
          copyable
          className="font-bold"
        >
          {walletAddress && walletAddress.toString()}
        </Paragraph>
        <FillButton onClick={logoutClickHandler}>
          <p>LOGOUT</p>
        </FillButton>
      </Space>
    </div>
  )
}
