import {
    setStore,
    getStore,
} from '@/util/store'
const common = {

    state: {
        language: getStore({ name: 'language' }) || 'zh',
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language
            setStore({
                name: 'language',
                content: state.language
            })
        }
    }
}
export default common