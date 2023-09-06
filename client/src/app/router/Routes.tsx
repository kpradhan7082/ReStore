import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import Catalog from '../../features/catalog/Catalog'
import ProductDetail from '../../features/catalog/ProductDetail'
import ContactsPage from '../../features/contacts/ContactsPage'
import AboutPage from '../../features/about/AboutPage'
import ServerError from '../errors/ServerError'
import NotFoundError from '../errors/NotFoundError'

export const Routes = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "", element: <HomePage />
            },
            {
                path: "/catalog", element: <Catalog />
            },
            {
                path: "/catalog/:id", element: <ProductDetail />
            },
            {
                path: "/contacts", element: <ContactsPage />
            },
            {
                path: "/about", element: <AboutPage />
            },
            {
                path: "/server-error", element: <ServerError />
            },
            {
                path: "/not-found", element: <NotFoundError />
            },
            {
                path: "*", element : <Navigate to="/not-found" />
            }
            
        ]
    }
])