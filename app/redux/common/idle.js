export default (state, idle) => ({
    ...state,
    ui: {
        ...state.ui,
        idle,
    },
});
