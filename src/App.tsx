import React from 'react'
import RootComponent from './RootComponent'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Helmet>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
            </Helmet>
            <BrowserRouter>
                <Header />
                <main>
                    <RootComponent />
                </main>
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default App
