import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState{
    isAuthenticated:boolean,
    user:string|null,
    error:string|undefined
    loading:boolean
    token:string|null
}
interface FormData{
    email:string,
    password:string
}

const initialState :LoginState= {
    isAuthenticated : false,
    user : "",
    error : "",
    loading:true,
    token:""
}

export const loginUserAsync = createAsyncThunk(
    "login",
    async (formData:FormData,thunkAPI)=>{
        try{
            let response = await axios.post("https://animal-movement-backend.onrender.com/auth/login",formData)
            return response
        }catch(e){
            throw e
        }
    }
)


const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        clearLoginState(state){
            state.isAuthenticated=false
            state.error=""
            state.user=""
            state.loading=false
            state.token=""
            localStorage.removeItem('token')
        },
        setAuthState(state){
            state.isAuthenticated=true
            state.error=""
            state.token=localStorage.getItem('token')
            state.loading=false
            state.user=localStorage.getItem('user')
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUserAsync.fulfilled,(state,action)=>{
            console.log(action)
            state.isAuthenticated=true;
            state.error="";
            state.user = action.payload.data.payload.email;
            state.loading=false;
            state.token = action.payload.data.token

            localStorage.setItem('token',action.payload.data.token)
            localStorage.setItem('user',action.payload.data.payload.email)
        })
        builder.addCase(loginUserAsync.pending,(state,action)=>{
            state.isAuthenticated=false;
            state.error="";
            state.user = "";
            state.loading=true;
        })
        builder.addCase(loginUserAsync.rejected,(state,action)=>{
            console.log(action)
            state.isAuthenticated=false;
            state.error=action?action.error.message:"";
            state.user = "";
            state.loading=false;
        })
    }
})
export const { clearLoginState,setAuthState } = loginSlice.actions;

export default loginSlice.reducer;