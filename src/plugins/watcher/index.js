export default store => {
    store.subscribe((mutation, state) => {
        if (mutation.type === "SET_FILTER_VALUES") {
            if (mutation.payload.values.length > 0) {
                let filters = store.getters.filterValues;
                let data = store.getters.originalData;

                for (let filterProp of Object.keys(filters)) {
                    let res = data.filter(function (el) {
                        return filters[filterProp].indexOf(el[filterProp]) >= 0;
                    });
                    data = res;
                }
                store.commit('SET_DASH_DATA', {dashData: data});
            } else {
                store.commit('SET_DASH_DATA', {dashData: store.getters.originalData});
            }
        }


        if (mutation.type === "SET_ORIGINAL_DATA") {
            store.commit('SET_DASH_DATA', {dashData: mutation.payload.originalData});
        }

    });

    store.subscribeAction({
        after: (action, state) => {
            console.log("watch2")
            if (action.type === "load") {
                alert("loading data");
            }
        }
    });
};