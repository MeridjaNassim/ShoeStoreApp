import { useCart } from "../../features/cart/context/CartContext"
import CartProductList from "../../features/cart/components/CartProductList"
function Cart() {
  const { actions: cartActions } = useCart()
  const cartCount = cartActions.getProductsCount()
  return (
    <div className="mt-10 px-10 md:px-0">
      <h1 className="text-6xl text-slate-900">Your Cart ({cartCount})</h1>
      <hr className="h-1 rounded-full relative top-5 mb-10 bg-slate-900 opacity-60" />
      <CartProductList/>
      <hr className="h-1 rounded-full relative top-5 mb-10 bg-slate-900 opacity-60" />
      <div>
        <h2 className="text-4xl text-slate-900 text-right">Total: {cartActions.getTotalPrice()}$</h2>
      </div>
    </div>
  )
}

export default Cart