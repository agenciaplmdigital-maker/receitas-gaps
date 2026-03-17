import { Header } from '@/components/Shared/Header'
import { Navigation } from '@/components/Shared/Navigation'
import { ShoppingListContainer } from '@/components/ShoppingList/ShoppingListContainer'

export default function ShoppingListPage() {
  return (
    <>
      <Header />
      <ShoppingListContainer />
      <Navigation />
    </>
  )
}
