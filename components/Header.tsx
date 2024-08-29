'use client'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useCookies} from "react-cookie";
import {useMe} from "@/service/api/auth";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogOut} from "lucide-react";
import {useRouter} from "next/navigation";

const Header = () => {
    const router = useRouter()
    const [cookies, _setCookie, removeCookie] = useCookies(['token']);
    const {data: user} = useMe(cookies.token);
    const logout = () => {
        removeCookie('token');
        router.replace('/signin');
    }
    return (
        <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-3">
            <div className="ml-auto px-10">
                {!user ?
                    <Button asChild>
                        <Link href="signin">Connexion</Link>
                    </Button> :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.nom}${user.prenom}`}/>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user.prenom}.{user.nom}</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={logout}> <LogOut
                                size={15}/> Déconnexion</DropdownMenuItem>
                        </DropdownMenuContent>`
                    </DropdownMenu>
                }

            </div>
        </header>
    )
}

export default Header;