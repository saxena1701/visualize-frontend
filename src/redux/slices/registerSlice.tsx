import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface FormData{
    name:string,
    email:string,
    password:string
}


interface RegisterState{
    isLoading:boolean,
    isRegistered:boolean,
    error : string | undefined
}

const initialState:RegisterState = {
    isLoading:false,
    isRegistered:false,
    error : ""
}


export const registerUserAsync = createAsyncThunk(
    'registerUserAsync',
    async (formData:FormData,thunkAPI)=>{
        try{
            let response = await axios.post('https://animal-movement-backend-1.onrender.com/auth/register',formData);
            return response;
        }catch(e){
            throw e;
        }
    }
)

const registerSlice = createSlice({
    name : "register",
    initialState,
    reducers:{
        clearRegistrationState(state){
            state.isRegistered=false
            state.error=""
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(registerUserAsync.fulfilled, (state,action)=>{
            state.isRegistered=true;
            state.isLoading=false;
            state.error = "";
        })
        builder.addCase(registerUserAsync.pending,(state)=>{
            state.isRegistered=false;
            state.isLoading=true;
            state.error = "";
        })
        builder.addCase(registerUserAsync.rejected,(state,action)=>{
            state.isRegistered=false;
            state.isLoading=false;
            state.error = action ? action.error.message : "";
        })

        
    }
})


export const { clearRegistrationState } = registerSlice.actions;

export default registerSlice.reducer;