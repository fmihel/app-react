/* eslint-disable no-return-assign */
import React, { useEffect } from 'react';
import redux from 'REDUX';

function App() {
    useEffect(()=>{
        let $r = $('body');
        console.log($r);

    },[])
    return (<div>App</div>);
}

const mapStateToProps = (state) => ({
    theme: state.ui.theme,
});

export default redux.connect(mapStateToProps)(App);
