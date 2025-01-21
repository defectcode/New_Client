'use client'
import { useState } from 'react'
import Link from 'next/link'
import { HeaderMenu } from './header-menu/HeaderMenu'
import { Logo } from './logo/Logo'
import { SearchInput } from './search-input/SearchInput'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { User } from './header-menu/header-cart/cart-item/user'
import { CheckoutCartHome } from './header-menu/header-cart/CheckoutCartHome'


export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="lg:py-2 p-0 max-w-[1400px] w-full md:h-full h-[60px] flex items-center justify-between mx-auto xl:px-0 px-5 bg-transparent">
      
      {/* Desktop */}
      <div className="flex-1 lg:block hidden">
        <HeaderMenu />
      </div>
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <Logo />
      </div>
      <div className="flex-1 flex items-center justify-end lg:flex hidden gap-10">
        <SearchInput />
        <User />
        <Button variant="ghost" onClick={toggleCart} className='p-0 hover:bg-transparent'>
          <Image src="/images/shopNavBar.svg" alt="shop" width={15} height={17} />
        </Button>
      </div>
      

      {/* Mobile */}
      <div className="flex items-center justify-between w-full h-[60px] lg:hidden">
        <div className='flex items-center gap-[10px]'>
          <Link href="/" className="">
            <Image src="/images/home.svg" alt="home" width={15} height={15} />
          </Link>
          <HeaderMenu />
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Logo />
        </div>
        <div className="flex items-center gap-5">
          <SearchInput />
          <User />
          <button onClick={toggleCart}>
            <Image src="/images/shop.svg" alt="cart" width={13} height={15} />
          </button>
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-[430px] w-full relative">
            <button 
              className="absolute top-5 right-5 text-2xl font-bold" 
              onClick={toggleCart}
            >
              <Image src='/images/close.svg' alt='close' width={12} height={12}/>
            </button>
            <CheckoutCartHome />
          </div>
        </div>
      )}
    </div>
  )
}
