export const initialState = {
    loadingPendingtab : false,
    loadingInProgressTab : false,
    loadingCompletedTab : false,
    loadingTaskModal : false,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING_PENDINGTAB' :
            return { ...state, loadingPendingtab : true };
            case 'UNSET_LOADING_PENDINGTAB' :
            return {...state, loadingPendingtab : false };
    case 'SET_LOADING_INPROGRESSTAB' :
        return { ...state, loadingInProgressTab : true };
        case 'UNSET_LOADING_INPROGRESSTAB' :
        return {...state, loadingInProgressTab : false };
    case 'SET_LOADING_COMPLETEDTAB' :
        return { ...state, loadingCompletedTab : true };
        case 'UNSET_LOADING_COMPLETEDTAB' :
        return {...state, loadingCompletedTab : false };
    case 'SET_LOADING_TASKMODAL' :
        return { ...state, loadingTaskModal : true };
        case 'UNSET_LOADING_TASKMODAL' :
        return {...state, loadingTaskModal : false };
    default:
        return state;
    }
}