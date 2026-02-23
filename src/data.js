export const API_KEY = 'AIzaSyDyBOf5sfWprP6mdjrxD9YwhofmfTCx4eM';

export const value_converter = (value)=>{
if(value>= 1000000){
    return Math.floor(value/1000000)+"M";
}
else if(value >= 1000){
     return Math.floor(value/1000)+"K";
}
else{
    return value;
}
}

// AIzaSyBBnLa9zdEiwNSpeq5PAu0VZCTMo_NoUDU
// 
//AIzaSyBBnLa9zdEiwNSpeq5PAu0VZCTMo_NoUDU