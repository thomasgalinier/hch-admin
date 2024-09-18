'use client'
import {usePathname, useRouter} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useId} from "react";

const Header = () => {
    const path = usePathname();
    const pathSegments = path.split('/').filter(segment => segment);
    const id = useId();
    return (
        <header className="p-4">
            <Breadcrumb>
                <BreadcrumbList id={id}>
                    {pathSegments.map((segment, index) => (
                        <>
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink href={`/${segment}`}>
                                    {segment}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}

export default Header;