import {
  MapTrifold,
  Scan,
  TrafficSignal,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react"
import {
  FC,
  ReactElement,
} from "react"
import { Link } from "react-router-dom"

type NavBarItem = {
  to: string
  icon: ReactElement
  title: string
}

const navBarItems: NavBarItem[] = [
  {
    to: "/app",
    icon: <MapTrifold size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />,
    title: "Maps",
  },
  {
    to: "/app/collection",
    icon: <TrafficSignal size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />,
    title: "Collection",
  },
  {
    to: "/app/capture",
    icon: <Scan size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />,
    title: "Capture",
  },
  {
    to: "/app/wallet",
    icon: <Wallet size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />,
    title: "Wallet",
  },
  {
    to: "/app/account",
    icon: <UserCircleGear size={32} color="#6b7280" weight="fill" className="group-hover:fill-[#ffebeb]" />,
    title: "Account",
  },
]

const BottomNavBar: FC = () => {
  return (
    <div className="w-full h-16 bg-zinc-800 border-none z-50">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navBarItems.map((item, index) => (
          <Link
            to={item.to}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group"
            key={index}
          >
            {item.icon}
            <span className="text-sm text-gray-500 group-hover:text-white">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BottomNavBar
