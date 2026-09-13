import { Header } from "@/components/header"
import "./styles.css"

function MainLayout({...props}) {
    return (
        <div className="main-layout">
            <Header />
            <main className="content">{props.children}</main>
        </div>
    )
}

export default MainLayout