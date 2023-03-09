import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import  Home  from './pages'
import  Advertisement  from './pages/advertisement/page'
import  List  from './pages/list/page'
import  CashRegister  from './pages/cash-register/page'
import  Sell  from './pages/sell/page'
import  Profile  from './pages/profile/page'
import  Products  from './pages/products/page'
import  Register  from './pages/register/page'
import  termOfUse  from './pages/register/term-of-use/page'

const AppNavigator = createStackNavigator({
  'home': Home,
  "advertisement": Advertisement,
  "list": List,
  "cash-register": CashRegister,
  "sell": Sell,
  "profile": Profile,
  "products": Products,
  "register": Register,
  "term-of-use": termOfUse,
},
{
  defaultNavigationOptions: {
    headerShown: false,
  },
})

export default createAppContainer(AppNavigator)