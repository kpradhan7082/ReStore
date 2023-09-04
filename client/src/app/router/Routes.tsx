import { createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import Catalog from '../../features/catalog/Catalog'
import ProductDetail from '../../features/catalog/ProductDetail'
import ContactsPage from '../../features/contacts/ContactsPage'
import AboutPage from '../../features/about/AboutPage'

export const routes = createBrowserRouter([
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
            }
        ]
    }
])