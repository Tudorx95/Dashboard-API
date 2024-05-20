import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        // the rendering problem is here when trying to simulate the app. The className covers the entire page
        <main>
            {/* All the children of Layout component is represented by the Outlet */}
            <Outlet />
        </main>
    )
}

export default Layout;