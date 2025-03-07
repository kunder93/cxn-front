import RootComponent from './RootComponent'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './components/Common/NotificationContext'

const App = (): React.JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NotificationProvider>
                    <Header />
                    <main>
                        <RootComponent />
                    </main>
                    <Footer />
                </NotificationProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default App
