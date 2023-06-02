import React from 'react'
import RootComponent from './RootComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
      
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                    <main>
                        
                            <RootComponent/>
                           
                    </main>
                <Footer/>
            </BrowserRouter>
        </Provider>
    )
}

export default App
