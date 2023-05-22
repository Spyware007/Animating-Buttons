import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./cart/CartSlice"
import OrderCreateSlice from "./order/OrderCreateSlice"
import OrderDeliverSlice from "./order/OrderDeliverSlice"
import OrderDetailSlice from "./order/OrderDetailSlice"
import OrderListAdminSlice from "./order/OrderListAdminSlice"
import OrderListSlice from "./order/OrderListSlice"
import OrderPaySlice from "./order/OrderPaySlice"
import ProjectCreateReviewSlice from "./projects/ProjectCreateReviewSlice"
import ProjectCreateSlice from "./projects/ProjectCreateSlice"
import ProjectDeleteSlice from "./projects/ProjectDeleteSlice"
import ProjectDetailSlice from "./projects/ProjectDetailSlice"
import ProjectSlice from "./projects/ProjectSlice"
import ProjectUserSlice from "./projects/ProjectUserSlice"
import ProjectUpdateSlice from "./projects/ProjectUpdateSlice"
import UserDeleteSlice from "./user/UserDeleteSlice"
import UserDetailSlice from "./user/UserDetailSlice"
import UserListSlice from "./user/UserListSlice"
import UserLoginSlice from "./user/UserLoginSlice"
import UserProfileSlice from "./user/UserProfileSlice"
import UserRegisterSlice from "./user/UserRegisterSlice"
import UserUpdateSlice from "./user/UserUpdateSlice"

export const store = configureStore({
    reducer:{
        "project":ProjectSlice,
        "projectDetail":ProjectDetailSlice,
        "projectDelete":ProjectDeleteSlice,
        "projectCreate":ProjectCreateSlice,
        "projectUpdate":ProjectUpdateSlice,
        "projectUser":ProjectUserSlice,
        "projectCreateReview":ProjectCreateReviewSlice,
        "cart":CartSlice,
        "userLogin":UserLoginSlice,
        "userRegister":UserRegisterSlice,
        "userProfile":UserProfileSlice,
        "userList":UserListSlice,
        "userUpdate":UserUpdateSlice,
        "userDetail":UserDetailSlice,
        "userDelete":UserDeleteSlice,
        "orderCreate":OrderCreateSlice,
        "orderDetail":OrderDetailSlice,
        "orderPay":OrderPaySlice,
        "orderList":OrderListSlice,
        "orderListAdmin":OrderListAdminSlice,
        "orderDeliver":OrderDeliverSlice,
    }
})