import React from 'react'
import Header from './components/Header';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
      <>
          <Header />
          <Outlet/>
      </>
  )
}
