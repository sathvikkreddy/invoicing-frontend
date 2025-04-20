'use client'

import type { Session } from 'next-auth'
import { ModeToggle } from '../mode-toggle'
import { SidebarFooter, SidebarTrigger, useSidebar } from '../ui/sidebar'
import { NavUser } from './nav-user'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function SidebarFooterItems({
    session,
    fakeUser,
}: {
    session: Session | null
    fakeUser: {
        id: string
        email: string
        image: string
        name: string
    }
}) {
    const { open } = useSidebar()
    console.log(open)
    return (
        <SidebarFooter
            className={`flex justify-center items-center gap-2 ${open ? '' : 'flex-col-reverse'}`}
        >
            <NavUser
                user={session ? session.user : fakeUser}
                isFake={!!!session}
            />
            <ModeToggle />
            <SidebarTrigger />
        </SidebarFooter>
    )
}
