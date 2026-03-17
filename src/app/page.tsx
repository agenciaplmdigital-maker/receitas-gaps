import { Header } from '@/components/Shared/Header'
import { Navigation } from '@/components/Shared/Navigation'
import { DashboardContainer } from '@/components/Dashboard/DashboardContainer'

export default function Home() {
  return (
    <>
      <Header />
      <DashboardContainer />
      <Navigation />
    </>
  )
}
