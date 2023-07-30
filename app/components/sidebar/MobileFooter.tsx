'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import MobileItem from './MobileItem';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import SettingsModal from './SettingsModal';
import { useState } from 'react';

interface MobileFooterProps {
    currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
    const routes = useRoutes();
    const [isSettingModelOpen, setIsSettingModelOpen] = useState(false);
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <>
            <SettingsModal currentUser={currentUser} isOpen={isSettingModelOpen} onClose={() => setIsSettingModelOpen(false)} />
            <div
                className="
				fixed 
				justify-between 
				w-full 
				bottom-0 
				z-40 
				flex 
				items-center 
				bg-white 
				border-t-[1px] 
				lg:hidden
			"
            >
                {routes.map((route) => (
                    <MobileItem key={route.href} href={route.href} active={route.active} icon={route.icon} onClick={route.onClick} />
                ))}
                <div
                    onClick={() => setIsSettingModelOpen(true)}
                    className="
                        cursor-pointer
                        hover:opacity-75
                        transition
                        px-4
                    "
                >
                    <Avatar user={currentUser} />
                </div>
            </div>
        </>
    );
};

export default MobileFooter;
