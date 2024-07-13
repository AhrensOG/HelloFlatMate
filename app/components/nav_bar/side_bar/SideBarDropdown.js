import { plus_jakarta } from '@/font'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'

export default function SideBarDropdown({ tittle, icon, info }) {
    return (
        <Menu as="div" className={`${plus_jakarta.className} relative inline-block text-left border-none`}>
            <div>
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50">
                    <div className='flex gap-2 items-center w-full h-[1.25rem]'>
                        <div><Image src={icon} layout='responsive' width={20} height={20} alt={"Boton mi dormitorio"} /></div>
                        <h5 className='text-gris-español font-medium text-xl'>{tittle}</h5>
                    </div>
                    <Image className='self-end pb-[5px]' src={"/nav_bar/side_bar/item-side-bar-arrow.svg"} layout='res' width={10} height={8.03} alt={"Boton mi dormitorio"} />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute left-[0.6rem] z-10 w-[95%] origin-top-right rounded-md drop-shadow-2xl ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in  bg-white-nav"
            >
                <div className="p-1">
                    <p>elemento1</p>
                    <p>elemento1</p>
                    <p>elemento1</p>
                    <p>elemento1</p>
                </div>
            </MenuItems>
        </Menu>
    )
}
