import { Canvas } from 'react-three-fiber'
import Box from './components/Box'
import './App.css'
import 'antd/dist/antd.min.css'
import { Switch } from 'antd'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { FaInstagram, FaTwitter, FaBehance } from 'react-icons/fa'
import { Suspense, useState } from 'react'
import { useEffect } from 'react'
import Loading from './components/Loading'

function App() {
  const [toggle, setToggle] = useState('light-theme')
  const [boxToggle, setBoxToggle] = useState(true)

  const toggler = () => {
    setBoxToggle(!boxToggle)
    if (toggle === 'light-theme') {
      setToggle('dark-theme')
    } else {
      setToggle('light-theme')
    }
  }

  useEffect(() => {
    document.documentElement.className = toggle
  }, [toggle])
  return (
    <Suspense fallback={<Loading />}>
      <div className='three-canvas-container'>
        <Canvas
          gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
          linear
          id='three-canvas-container'
        >
          <OrbitControls />
          <Box toggle={boxToggle} />
          {/*Light*/}
          <Environment
            files={'brown_photostudio_05_4k.hdr'}
            path={'/'}
            intensity={0}
          />
          {/*Geometry*/}
        </Canvas>
      </div>

      <div className='header-container'>
        <h1>
          I'm Samson , a freelance motion graphics designer and artist at heart.
          I specialise in 3D renderings and augmented reality design. I am
          passionate about art and technology , and constantly learning new
          things that help push my craft to the next level.
          <br />
          <br />
          Contact me at samsonsim2@gmail.com if you're interested in
          collaborations.
          <br />
          <br />
          CV and portfolio are available upon request
        </h1>
      </div>

      <div className='icons-container'>
        <button className='btn'>
          <a href='https://www.instagram.com/samson.img/' target='_blank'>
            <FaInstagram />
          </a>
        </button>
        <button className='btn'>
          <a href='https://twitter.com/' target='_blank'>
            <FaTwitter />
          </a>
        </button>
        <button className='btn'>
          <a href='https://www.behance.net/samsonimg' target='_blank'>
            <FaBehance />
          </a>
        </button>
      </div>

      <div className='toggle-section'>
        <Switch onClick={toggler} size='default' />
        {/* {toggle ? <span>you changed me</span> : <span>change me back</span>} */}
      </div>
    </Suspense>
  )
}

export default App
