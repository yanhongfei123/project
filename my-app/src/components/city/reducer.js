 const demo= (state = { a:100 ,b:200  } , action={})=> {
    switch (action.type) {
        case 'DEMO':
            return {
                 ...state,
                 a:action.a,
                 b:action.b
                 
            }
        default:
            return state
    }
  }
  const demo2= (state = [{f:100}] , action={})=> {
    switch (action.type) {
        case 'DEMO2':
            return  state
        default:
            return state
    }
  }

  export default{
      demo, demo2
  }
