
  const demo3= (state = { c:666 } , action={})=> {
    switch (action.type) {
        case 'DEMO3':
            return {
                 ...state,
                 c:action.c,
                 
            }
        default:
            return state
    }
  }
  
  export default{
      demo3
  }
