'use client'
import {usePathname} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {SidebarTrigger} from "@/components/ui/sidebar";

const Header = () => {
    const path = usePathname();
    const pathSegments = path.split('/').filter(segment => segment);

    return (
        <header className="p-4 flex items-center">
            <SidebarTrigger className='mr-2' />
            <Breadcrumb>
                <BreadcrumbList>
                    {pathSegments.map((segment, index) => (
                        <BreadcrumbItem key={`${segment}-${index}`}>
                            <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                                {segment}
                            </BreadcrumbLink>
                            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}

export default Header;
