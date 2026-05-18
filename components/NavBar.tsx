import Link from "next/link"
import Image from "next/image";

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">
                    <Image src="/icons/logo.png" alt="logo" width={30} height={30}/>
                    <p>Canary Events</p>
                </Link>

                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/events">Events</Link>
                    <Link href="/events/create">Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar