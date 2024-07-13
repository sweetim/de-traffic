import {
  Icon,
  MapTrifold,
  Scan,
  TrafficSignal,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react"
import clsx from "clsx"
import { FC } from "react"
import {
  Link,
  useLocation,
} from "react-router-dom"
import { match } from "ts-pattern"

type NavBarItem = {
  to: string
  icon: Icon
  title: string
}

const navBarItems: NavBarItem[] = [
  {
    to: "/app",
    icon: MapTrifold,
    title: "Maps",
  },
  {
    to: "/app/collection",
    icon: TrafficSignal,
    title: "Collection",
  },
  {
    to: "/app/capture",
    icon: Scan,
    title: "Capture",
  },
  {
    to: "/app/wallet",
    icon: Wallet,
    title: "Wallet",
  },
  {
    to: "/app/account",
    icon: UserCircleGear,
    title: "Account",
  },
]

const BottomNavBar: FC = () => {
  const location = useLocation()
  const currentToRoute = location.pathname.split("/", 3).join("/")

  return (
    <div className="w-full h-16 bg-zinc-800 border-none z-50">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navBarItems.map((item, index) => {
          const isPathMatching = currentToRoute === item.to

          const linkClassName = clsx(
            "inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-900 group",
            {
              "bg-zinc-900": isPathMatching,
            },
          )

          const spanClassName = clsx(
            "text-sm text-gray-500 group-hover:text-white",
            {
              "text-white": isPathMatching,
            },
          )

          const navIconColor = match(isPathMatching)
            .with(true, () => "#ffebeb")
            .otherwise(() => "#6b7280")

          const NavIcon = item.icon

          return (
            <Link
              to={item.to}
              className={linkClassName}
              key={index}
            >
              <NavIcon
                size={32}
                color={navIconColor}
                weight="fill"
                className="group-hover:fill-[#ffebeb]"
              />
              <span className={spanClassName}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavBar
