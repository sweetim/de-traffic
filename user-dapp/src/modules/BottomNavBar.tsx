import {
  BriefcaseMetal,
  MapTrifold,
  Scan,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react"
import { FC } from "react"
import { Link } from "react-router-dom"

const BottomNavBar: FC = () => {
  return (
    <div className="w-full h-16 bg-zinc-800 border-none">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link
          to="/app"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group"
        >
          <MapTrifold size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />
          <span className="text-sm text-gray-500 group-hover:text-white">
            Maps
          </span>
        </Link>
        <Link
          to="/app/contacts"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group"
        >
          <BriefcaseMetal size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />
          <span className="text-sm text-gray-500 group-hover:text-white">
            Collection
          </span>
        </Link>
        <Link
          to="/app/capture"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group"
        >
          <Scan size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />
          <span className="text-sm text-gray-500 group-hover:text-white">
            Capture
          </span>
        </Link>
        <Link
          to="/app/wallet"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group"
        >
          <Wallet size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />
          <span className="text-sm text-gray-500 group-hover:text-white">
            Wallet
          </span>
        </Link>
        <Link
          to="/app/account"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group"
        >
          <UserCircleGear size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />
          <span className="text-sm text-gray-500 group-hover:text-white">
            Account
          </span>
        </Link>
      </div>
    </div>
  )
}

export default BottomNavBar
