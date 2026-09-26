import { Header } from "@/components/Header"
import "./MainLayout.css"

function MainLayout({...props}) {
    return (
        <div className="main-layout">
            <Header />
            <main className="content">{props.children}</main>
        </div>
    )
}

export default MainLayout