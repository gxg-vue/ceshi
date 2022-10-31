const save = (st = localStorage, key, value) => {
    st.setItem(key, JSON.stringify(value));
};

const get = (st = localStorage, key) => {
        const v = st.getItem(key);
        try {
            return JSON.parse(v);
        } catch {
            return v;
        }
    }
    //  sessionStorage存储
    //  仅有一个参数时为取值
    //  两个参数时为存值，key,value
export const session = (...args) => {
    if (args.length === 1) {
        return get(sessionStorage, args[0]);
    }
    save(sessionStorage, args[0], args[1]);
}

//  localStorage存储
//  同上
export const local = (...args) => {
    if (args.length === 1) {
        return get(localStorage, args[0]);
    }
    save(localStorage, args[0], args[1]);
}


export const getData = (key) => {
    if (!key) return;
    if (window.sessionStorage.getItem(key)) {
        return JSON.parse(window.sessionStorage.getItem(key)) //从本地获取数据
    }
}

export const saveData = (key, value) => {
    if (!key) return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, value); //保存数据到本地
}

export const delData = (key) => { //删除本地数据
    console.log(key);
    if (!key) return;
    window.sessionStorage.removeItem(key);
}