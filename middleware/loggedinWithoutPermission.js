export default function ({store, redirect }) {
    //primeiro store, depois o state e depois o módulo 
    // se eu to logado, não entre na rota /login 
    console.log('auth?', store.state.auth.loggedIn)
    store.state.auth.loggedIn ? redirect('/') : true


}