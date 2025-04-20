import {
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
    Home,
    NotebookText,
    ReceiptIndianRupee,
    ScrollText,
    Tag,
} from 'lucide-react'

import { NavMain } from '~/components/sidebar/nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '~/components/ui/sidebar'
import { auth } from '~/server/auth'
import { SidebarFooterItems } from './sidebar-footer-items'

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Invoices',
            url: '/invoices',
            icon: ScrollText,
            isActive: true,
        },
        {
            title: 'Companies',
            url: '/companies',
            icon: NotebookText,
            isActive: true,
        },
        {
            title: 'Purchases',
            url: '/purchases',
            icon: Tag,
        },
        {
            title: 'Payments',
            url: '/payments',
            icon: ReceiptIndianRupee,
        },
    ],
}

export async function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const session = await auth()
    const fakeUser = {
        id: 'fakeId',
        email: 'fakeemail@fake.com',
        image: 'https://github.com/shadcn.png',
        name: 'Fake User',
    }
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarMenu>
                <SidebarMenuItem className='flex justify-center mt-2'>
                    <SidebarMenuButton>
                        <Home /> SLNP
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            {/* <SidebarFooter className='flex justify-center items-center'>
                <SidebarTrigger />
                <ModeToggle />
                <NavUser
                    user={session ? session.user : fakeUser}
                    isFake={!!!session}
                />
            </SidebarFooter> */}
            <SidebarFooterItems session={session} fakeUser={fakeUser} />
            <SidebarRail />
        </Sidebar>
    )
}
