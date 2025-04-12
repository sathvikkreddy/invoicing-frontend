import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from 'lucide-react'

import { NavMain } from '~/components/sidebar/nav-main'
import { NavUser } from '~/components/sidebar/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '~/components/ui/sidebar'
import { auth } from '~/server/auth'

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
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: 'Companies',
            url: '/companies',
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: 'Sales',
            url: '/sales',
            icon: Bot,
        },
        {
            title: 'Purchases',
            url: '/purchases',
            icon: BookOpen,
        },
        {
            title: 'Payments',
            url: '/payments',
            icon: Settings2,
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
            <SidebarHeader>Invoicing</SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={session ? session.user : fakeUser}
                    isFake={!!!session}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
