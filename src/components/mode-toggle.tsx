'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { useSidebar } from './ui/sidebar'

export function ModeToggle() {
    const { setTheme } = useTheme()
    const { isMobile, state } = useSidebar()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Tooltip>
                    <TooltipTrigger asChild> */}
                <Button variant='outline' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
                {/* </TooltipTrigger>
                    <TooltipContent
                        side='right'
                        align='center'
                        hidden={state !== 'collapsed' || isMobile}
                    >
                        Toggle Theme
                    </TooltipContent>
                </Tooltip> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
